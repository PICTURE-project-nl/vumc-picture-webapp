const chokidar = require('chokidar')
const exec = require('child_process').exec

const logError = (error) => console.log(`❗  Watchers error: ${error}`)

const startWatcher = (glob, command) => {
  console.log(`🔎  Watcher started for: ${glob}`)
  chokidar
    .watch(glob)
    .on('change', (path) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          logError(error)
          return
        }

        console.log(`🧐   Watchers file changed: ${path}`)

        if (stdout) console.log(`🔥  Watchers executing: ${stdout}`)
        if (stderr) logError(stderr)
      })
    })
}

startWatcher('src/pages/**/routes.js', 'yarn extract-routes')
startWatcher('src/assets/styles/settings/', 'yarn extract-scss-variables')
