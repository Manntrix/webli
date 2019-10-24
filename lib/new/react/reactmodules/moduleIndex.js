const unzipper = require('unzipper')
const fs = require('fs')
var shell = require('shelljs');
const ora = require('../../../oraconfig')
const https = require('https');
const fse = require('fs-extra')


module.exports = function (url, pn) {
    var file = fs.createWriteStream('file.zip');
    ora.generating.start()
    https.get(url, function(response) {
        response.pipe(file)
        response.on('end', function(){
            fs.createReadStream('./file.zip')
    .pipe(unzipper.Extract({ path: process.cwd() }))
    .on('entry', entry => entry.autodrain())
    .promise()
    .then(
      function(){
        fse.removeSync('file.zip')
        shell.cd(`webli-${pn}`)
        ora.generating.succeed(); 
        ora.installing.start()
        shell.exec('npm install')
        ora.installing.succeed()
        if (shell.which('code')) {
            shell.exec('code .')
          }
        shell.exec('npm start')
      }
    )
        })
       
      });
}

