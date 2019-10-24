const ora = require('ora');
const colors = require('colors');
var emoji = require('node-emoji')


exports.generating = ora(colors.cyan('Generating Files'))
exports.installing = ora(colors.green(`Installing node packages - please be patient ${emoji.get('hourglass_flowing_sand') }`))
exports.configDatabase = ora(colors.yellow(`Configuring Database`))
exports.importDatabase = ora(colors.gray(`Importing Database`))
exports.changeURL = ora(colors.blue(`Replacing URL`))
exports.removeBackup = ora(colors.magenta(`Removing Backup Files`))
exports.usersLoading = ora(colors.green.bold(`Users Loading`))