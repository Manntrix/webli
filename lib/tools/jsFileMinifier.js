const inquirer = require('inquirer');
const terser = require('@node-minify/terser');
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
            compressor: terser,
            input: answers.from,
            output: answers.from,
            callback: function(err, min) {}
          });
          
        });
};