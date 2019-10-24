const values = require('./tools-value');
const inquirer = require('inquirer');
const htmlFileMinifier = require('./htmlFileMinifier')
const htmlDirMinifier = require('./htmlDirMinifier')
const cssFileMinifier = require('./cssFileMinifier')
const cssDirMinifier = require('./cssDirMinifier')
const jsFileMinifier = require('./jsFileMinifier')
const jsDirMinifier = require('./jsDirMinifier')
const minifyAll = require('./allMinifier')
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
inquirer.registerPrompt('filePath', require('inquirer-file-path'));


const questions = [
    { type: 'list', name: 'minifierType', message: 'Select your platform', choices: values.minifierTypes },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.minifierType == 'html'){
                htmlMinifier()
             } 
             else if (answers.minifierType == 'css'){
                cssMinifier()
             } 
             else if (answers.minifierType == 'js'){
                jsMinifier()
             } 
             else if (answers.minifierType == 'minifyAll'){
                minifyAll()
             }

        });
};

const question = [
    { type: 'list', name: 'minifierFDType', message: 'Select your platform', choices: values.minifierFDTypes }
]

function htmlMinifier(){
    inquirer
    .prompt(question)
    .then(function (answer) {
        if(answer.minifierFDType == 'file'){
            htmlFileMinifier()
         }  
         else if(answer.minifierFDType == 'directory'){
            htmlDirMinifier()
         }
      
    });
}

function cssMinifier(){
    inquirer
    .prompt(question)
    .then(function (answer) {
        if(answer.minifierFDType == 'file'){
            cssFileMinifier()
         }  
         else if(answer.minifierFDType == 'directory'){
            cssDirMinifier()
         }
      
    });
}
function jsMinifier(){
    inquirer
    .prompt(question)
    .then(function (answer) {
        if(answer.minifierFDType == 'file'){
            jsFileMinifier()
         }  
         else if(answer.minifierFDType == 'directory'){
            jsDirMinifier()
         }
      
    });
}