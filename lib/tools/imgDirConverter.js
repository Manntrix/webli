const inquirer = require('inquirer');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
const sharp = require('sharp');
const path = require('path')
const values = require('./tools-value');
var glob = require("glob")

const questions = [
    { type: 'checkbox', name: 'imgsExt', message: 'Select file extensions', choices: values.imgExts},
    { type: 'directory', name: 'from', message: 'Source folder', basePath: process.cwd() },
    { type: 'list', name: 'imgExt', message: 'Select the format you want to convert into', choices: values.imgExts }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            var b = answers.imgsExt
            var e = ''
          for(i=0; i< b.length; i++){
              e += b[i] + ','
          }

         
            glob(answers.from + `/**/*.{${e}}`, {}, function (er, files) {
               for(i=0; i< files.length; i++){
                   var f = files[i]
                   const a = path.parse(f)
                   sharp(f)
                   .toFile(a.dir + '/' + a.name + '.' + answers.imgExt)
                 
               }
             })
            
          
          
        });
};