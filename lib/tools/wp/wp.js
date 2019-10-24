const values = require('../tools-value');
const inquirer = require('inquirer');
const wpMigration = require('./wp-migration')
const wpUser = require('./wp-users')
const wpConfig = require('./wp-config-gen')
const maintenanceMode = require('./wp-maintenance')
const media = require('./wp-media')
const codeGen = require('./codegen')
const fs = require('fs')
const shell = require('shelljs')

const questions = [
    { type: 'list', name: 'WPType', message: 'What do you want to do ?', choices: values.WPTypes },
];

module.exports = function () {
   const path = process.cwd() + '/wp-config.php'
   if (fs.existsSync(path)) {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(!shell.which('wp')){
                console.log(colors.red.bold('wp cli is not installed in your machine run : npm install wp-commandline -g to install wp cli'))
             }else{
            if(answers.WPType == 'Migration'){
                wpMigration()
             }  
             else if (answers.WPType == "Change User Details"){
                wpUser()
             }
             else if(answers.WPType == 'wp-config'){
                wpConfig()
             }
             else if(answers.WPType == 'Code Generator'){
                codeGen()
             }
             else if(answers.WPType == 'Maintenance Mode'){
                maintenanceMode()
             }
             else if(answers.WPType == 'Media'){
                media()
             }
            }
          
        });
      }
      else{
         console.log('You are not in the wordpress root directory')
     }
};