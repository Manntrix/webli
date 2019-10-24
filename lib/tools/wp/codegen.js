const values = require('../tools-value');
const inquirer = require('inquirer');
const cpaT = require('./codegen/custompagetemplate');
const cptT = require('./codegen/customposttype');
const compress = require('./codegen/compresscodes');
const shell = require('shelljs')


const questions = [
    { type: 'list', name: 'codeType', message: 'What do you want to generate ?', choices: values.codeTypes },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(!shell.which('wp')){
                console.log(colors.red.bold('wp cli is not installed in your machine run : npm install wp-commandline -g to install wp cli'))
             }else{
            if(answers.codeType == 'Custom Page Template'){
                cpaT()
             }  
             else if (answers.codeType == 'Custom Post Type'){
                cptT()
             }
             else if (answers.codeType == 'Compress'){
                compress()
             }
             
            }
          
        });
};