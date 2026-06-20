#!/usr/bin/env bash
# Packs the package, installs the tarball in a temp project, and verifies
# the published entry imports at runtime and its types resolve for consumers.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
export npm_config_cache="$tmp/npm-cache"

cd "$root"
# Build first, the way `prepublishOnly` does at publish time, so the tarball
# carries a fresh dist (npm pack does not run prepublishOnly).
npm run build >/dev/null 2>&1
pack_output="$(npm pack --pack-destination "$tmp" --json)"
tarball_name="$(node -e "console.log(JSON.parse(process.argv[1])[0].filename)" "$pack_output")"
tarball="$tmp/$tarball_name"

cd "$tmp"
npm init -y >/dev/null 2>&1
npm install --no-audit --no-fund "$tarball" >/dev/null 2>&1

cat > check.mjs <<'EOF'
import assert from 'node:assert/strict'
import hyperaxe, { div, getFactory, varTag } from 'hyperaxe'
import { createFactory } from 'hyperaxe/factory'
import { createFactory as createFactoryAlias } from 'hyperaxe/factory.js'

assert.equal(typeof hyperaxe, 'function')
assert.equal(typeof getFactory, 'function')
assert.equal(typeof varTag, 'function')
assert.equal(div({ class: 'x' }, 'hi').outerHTML, '<div class="x">hi</div>')

// factory subpath works with a custom createElement implementation
assert.equal(createFactory, createFactoryAlias)
const fake = createFactory((tag) => ({ tagName: tag }))
assert.equal(fake.div().tagName, 'div')
EOF
node check.mjs
echo 'runtime import: ok'

cat > check.mts <<'EOF'
import hyperaxe, { div, type HyperscriptNode } from 'hyperaxe'
import { createFactory, type CreateElementFunction } from 'hyperaxe/factory'

const el: HyperscriptNode = div('typed')
const dyn = hyperaxe('custom-tag')('child')
const fn: CreateElementFunction = (tag) => div(tag)
const fake = createFactory(fn)
export { el, dyn, fake }
EOF
"$root/node_modules/.bin/tsc" --noEmit --strict --module nodenext \
  --moduleResolution nodenext --target es2022 check.mts
echo 'type resolution: ok'
