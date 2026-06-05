#!/usr/bin/env bash
# Packs the package, installs the tarball in a temp project, and verifies
# the published entry imports at runtime and its types resolve for consumers.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

cd "$root"
tarball="$tmp/$(npm pack --pack-destination "$tmp" 2>/dev/null | tail -1)"

cd "$tmp"
npm init -y >/dev/null 2>&1
npm install --no-audit --no-fund "$tarball" >/dev/null 2>&1

cat > check.mjs <<'EOF'
import assert from 'node:assert/strict'
import hyperaxe, { div, getFactory, varTag } from 'hyperaxe'

assert.equal(typeof hyperaxe, 'function')
assert.equal(typeof getFactory, 'function')
assert.equal(typeof varTag, 'function')
assert.equal(div({ class: 'x' }, 'hi').outerHTML, '<div class="x">hi</div>')
EOF
node check.mjs
echo 'runtime import: ok'

cat > check.mts <<'EOF'
import hyperaxe, { div, type HyperscriptNode } from 'hyperaxe'

const el: HyperscriptNode = div('typed')
const dyn = hyperaxe('custom-tag')('child')
export { el, dyn }
EOF
"$root/node_modules/.bin/tsc" --noEmit --strict --module nodenext \
  --moduleResolution nodenext --target es2022 check.mts
echo 'type resolution: ok'
