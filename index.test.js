import tempy from 'tempy'
import fs from 'fs'
import path from 'path'
import transformPkg from '.'

let dir
let pkgLocation
let yarnLockLocation

beforeEach(() => {
  dir = tempy.directory()
  pkgLocation = path.join(dir, 'package.json')
  yarnLockLocation = path.join(dir, 'yarn.lock')
})

test('reads and writes config', async () => {
  fs.writeFileSync(pkgLocation, '{}')

  const transform = transformPkg(pkg => {
    expect(pkg).toEqual({})
    return {
      pkg: { foo: 'bar' }
    }
  })

  await transform(dir)

  const actual = JSON.parse(fs.readFileSync(pkgLocation, 'utf-8'))
  expect(actual).toEqual({ foo: 'bar' })
})

test('installs dependencies', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  fs.writeFileSync(pkgLocation, '{}')

  const transform = transformPkg(pkg => {
    expect(pkg).toEqual({})
    return {
      pkg: { foo: 'bar' },
      deps: {
        deps: ['decamelize'],
        devDeps: ['filled-array']
      }
    }
  })

  await transform(dir)

  const res = JSON.parse(fs.readFileSync(pkgLocation, 'utf8'))
  expect(res).toHaveProperty('dependencies')
  expect(res).toHaveProperty('devDependencies')
})

// test("installs via yarn if there's a lockfile", async () => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
//   fs.writeFileSync(pkgLocation, '{}')
//   fs.writeFileSync(yarnLockLocation, '')

//   const transform = transformPkg(pkg => {
//     expect(pkg).toEqual({})
//     return {
//       pkg: { foo: 'bar' },
//       deps: {
//         deps: ['decamelize'],
//         devDeps: ['filled-array']
//       }
//     }
//     console.log(pkg)
//   })

//   await transform(dir)

//   const pkg = JSON.parse(fs.readFileSync(pkgLocation, 'utf8'))
//   expect(pkg).toHaveProperty('dependencies')
//   expect(pkg).toHaveProperty('devDependencies')
//   const yarn = fs.readFileSync(yarnLockLocation, 'utf8')
//   expect(yarn).toMatch(/decamelize/)
//   expect(yarn).toMatch(/filled-array/)
// })
