# `transform-pkg`

Create CLIs that modify a package.json

## Installation

### NPM
```
npm i -s transform-pkg
```

### Yarn
```
yarn add transform-pkg
```

## Example

```js
const transformPkg = require('transform-pkg')

const transform = (pkg, opts) => {

  // pkg is the parsed package.json
  pkg.name = 'this is a package'

  // these are installed automatically
  const deps = {
    deps: ['foo', 'bar', 'baz'],
    devDeps: ['other package']
  }

  // pkg is written to package.json, deps are installed
  return {pkg, deps}
}

const makeUselessName = transformPkg(transform)

makeUselessName('~/programming/project', {
  foo: 'bar',
  these: 'are passed to the transform function'
})
```

## License: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
Copyright 2017 Caleb Eby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
