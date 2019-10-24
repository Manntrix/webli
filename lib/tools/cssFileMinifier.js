const inquirer = require('inquirer');
const cssnano = require('@node-minify/cssnano');
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
const minify = require('@node-minify/core');


const questions = [
    { type: 'filePath', name: 'from', message: 'Source folder', basePath: process.cwd() }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
          minify({
            compressor: cssnano,
            input: answers.from,
            output: answers.from,
            callback: function(err, min) {}
          });
          
        });
};