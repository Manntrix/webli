const inquirer = require('inquirer');
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
const minify = require('@node-minify/core');
const htmlminifier = require('@node-minify/html-minifier');

const questions = [
    { type: 'filePath', name: 'from', message: 'Source folder', basePath: process.cwd() }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
          minify({
            compressor: htmlminifier,
            input: answers.from,
            output: answers.from,
            callback: function(err, min) {}
          });
          
        });
};