const inquirer = require('inquirer');
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
const sharp = require('sharp');
const path = require('path')
const values = require('./tools-value');

const questions = [
    { type: 'filePath', name: 'from', message: 'Source folder', basePath: process.cwd() },
    { type: 'list', name: 'imgExt', message: 'Select the format you want to convert into', choices: values.imgExts }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            const a = path.parse(answers.from)
            sharp(answers.from)
            .toFile(a.name + '.' + answers.imgExt)
            .then( data => { console.log(data)})
 
          
        });
};