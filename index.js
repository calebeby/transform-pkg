const readPkg = require('read-pkg-up')
const writePkg = require('write-pkg')
const execa = require('execa')
const hasYarn = require('has-yarn')

const installDeps = (deps = [], yarn = false, cwd) => {
  if (deps.length > 0) {
    if (yarn) {
      return execa('yarn', ['add', ...deps], { cwd })
    }
    return execa('npm', ['install', '--save', ...deps], { cwd })
  }
  return Promise.resolve()
}

const installDevDeps = (deps = [], yarn = false, cwd) => {
  if (deps.length > 0) {
    if (yarn) {
      return execa('yarn', ['add', '--dev', ...deps], { cwd })
    }
    return execa('npm', ['install', '--save-dev', ...deps], { cwd })
  }
  return Promise.resolve()
}

const install = (deps = {}, cwd = process.cwd()) => {
  const yarn = hasYarn(cwd)
  console.log('installing dependencies...')
  return installDeps(deps.deps, yarn, cwd).then(() =>
    installDevDeps(deps.devDeps, yarn, cwd)
  )
}

const transformPkg = transform => (dir = process.cwd(), opts) =>
  readPkg({ cwd: dir, normalize: false })
    .then(({ pkg }) => transform(pkg, opts))
    .then(({ pkg = {}, deps = {} }) =>
      writePkg(dir, pkg).then(() => install(deps, dir))
    )

module.exports = transformPkg
