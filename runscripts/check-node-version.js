const chalk = require('chalk')
const semver = require('semver')
const requiredNodeVersion = require('../package').engines.node
const installedNodeVersion = process.version

if (!semver.satisfies(installedNodeVersion, requiredNodeVersion)) {
  console.log(chalk.red(`
    Installed Node.js version ${installedNodeVersion} is outdated.
    Update Node.js to the required version ${requiredNodeVersion} and run 'yarn' to install all
    dependencies again.`
  ))
  console.log(`
    Use NVM (Node Version Manager) for managing multiple versions of Node.js. 
    See: ${chalk.underline('https://github.com/creationix/nvm')}
  `)
  process.exit(1)
}
