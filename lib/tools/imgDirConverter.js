const inquirer = require('inquirer');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
const path = require('path')
const values = require('./tools-value');
var glob = require("glob")
const webp = require('webp-converter');

const questions = [
    { type: 'checkbox', name: 'imgsExt', message: 'Select file extensions', choices: values.imgExts},
    { type: 'directory', name: 'from', message: 'Source folder', basePath: process.cwd() },
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
                webp.cwebp(f, a.dir + '/' + a.name + '.' + 'webp',"-q 80",function()
                {
                    console.log('done');	
                });
               }
             })
            
          
          
        });
};