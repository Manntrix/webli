const inquirer = require('inquirer');
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
const path = require('path')
const values = require('./tools-value');
const webp = require('webp-converter');

const questions = [
    { type: 'filePath', name: 'from', message: 'Source folder', basePath: process.cwd() }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            const a = path.parse(answers.from)
            webp.cwebp(answers.from, a.name + '.' + 'webp',"-q 80",function()
  {
 	
  });
 
          
        });
};