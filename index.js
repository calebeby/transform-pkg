const readPkg = require('read-pkg-up')
const writePkg = require('write-pkg')
const execa = require('execa')
const hasYarn = require('has-yarn')
const isOnline = require('is-online')

const runCmd = (cmd, opts, cwd) => {
  console.log(`$ ${cmd} ${opts.join(' ')}`)
  const proc = execa(cmd, opts, cwd)
  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)
  return proc
}

const installDeps = (deps = [], yarn = false, cwd, online = true) => {
  if (deps.length > 0) {
    if (yarn) {
      if (!online) {
        return runCmd('yarn', ['add', '--offline', ...deps], { cwd })
      }
      return runCmd('yarn', ['add', ...deps], { cwd })
    }
    return runCmd('npm', ['install', '--save', ...deps], { cwd })
  }
  return Promise.resolve()
}

const installDevDeps = (deps = [], yarn = false, cwd, online = true) => {
  if (deps.length > 0) {
    if (yarn) {
      if (!online) {
        return runCmd('yarn', ['add', '--offline', '--dev', ...deps], { cwd })
      }
      return runCmd('yarn', ['add', '--dev', ...deps], { cwd })
    }
    return runCmd('npm', ['install', '--save-dev', ...deps], { cwd })
  }
  return Promise.resolve()
}

const install = (deps = {}, cwd = process.cwd()) => {
  const yarn = hasYarn(cwd)
  console.log('installing dependencies...')
  return isOnline().then(online =>
    installDeps(deps.deps, yarn, cwd, online).then(() =>
      installDevDeps(deps.devDeps, yarn, cwd, online)
    )
  )
}

const transformPkg = transform => (dir = process.cwd(), opts) =>
  readPkg({ cwd: dir, normalize: false })
    .then(({ pkg }) => transform(pkg, opts))
    .then(({ pkg = {}, deps = {} }) =>
      writePkg(dir, pkg).then(() => install(deps, dir))
    )

module.exports = transformPkg
