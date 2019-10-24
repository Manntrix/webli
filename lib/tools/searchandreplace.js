
const values = require('./tools-value');
const inquirer = require('inquirer');
const fs = require('fs')
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
var glob = require("glob")

const questions = [   
    { type: 'directory', name: 'from', message: 'Select directory', basePath: process.cwd() },
    { type: 'checkbox', name: 'fileExt', message: 'Select file extensions', choices: values.fileExts},
    { type: 'input', name: 'search', message: 'Enter your search string' },
    { type: 'input', name: 'replace', message: 'Enter your replace string'},
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            var b = answers.fileExt
            var e = ''
          for(i=0; i< b.length; i++){
              e += b[i] + ','
          }
         
            glob(answers.from + `/**/*.{${e}}`, {}, function (er, files) {
               for(i=0; i< files.length; i++){
                   var f = files[i]

                   var data = fs.readFileSync(f, 'utf8')
                   var re = new RegExp(answers.search, 'g');
                   var result = data.replace(re, answers.replace);

                   fs.writeFileSync(f, result, 'utf8');
               }
             })
        });
}; 