
var shell = require('shelljs');
var Git = require("simple-git/promise");
const ora = require('../oraconfig')
const fse = require('fs-extra')

function fileGenearator (url, sn){
    Git().clone(url, sn, {}, ora.generating.start()).then(function () {
        ora.generating.succeed();
        shell.cd(sn);
        ora.installing.start()
        shell.rm('-rf', '.git');
        shell.exec('npm install', {silent: true})
        ora.installing.succeed()
        if (shell.which('code')) {
            shell.exec('code .')
          }
        shell.exec('npm start')
       
    }).catch(function (err) {
        ora.generating.fail()
       console.log(err)
    });
}


function htmlGen(url, sn){
    Git().clone(url, sn, {}, ora.generating.start()).then(function () {
        ora.generating.succeed(); 
        shell.cd(sn)
        if (shell.which('code')) {
            shell.exec('code .')
          }
    }).catch(function (err) {
        ora.generating.fail()
       console.log(err)
    });
}

module.exports = {htmlGen, fileGenearator};
