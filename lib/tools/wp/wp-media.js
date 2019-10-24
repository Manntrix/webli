const inquirer = require('inquirer');
const sh = require('shelljs')
const fs = require('fs')
const values = require('../tools-value');
const glob = require('glob')
const fse = require('fs-extra')

const questions = [
    { type: 'list', name: 'mainType', message: 'Select a option', choices: values.mediaTypes}];

module.exports = function () {
    const path = process.cwd() + '/wp-config.php'
    if(fs.existsSync(path)){
        inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.mainType == 'Delete Duplicate Images'){
                glob(process.cwd() + "/wp-content/uploads/**/?(*)-[0-9]*x[0-9]*.*", {}, function (er, files) {
                    for (i = 0; i < files.length; i++) {
                        fse.removeSync(files[i])
                    }
                })
             } 
             else if (answers.mainType == 'Regenarate Thumbnails') {
                sh.exec('wp media regenerate --yes')
             }
            
          
        });
    }
    else{
        console.log('You are not inside the wordpress root directory')
    }
    
};