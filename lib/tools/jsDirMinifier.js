const inquirer = require('inquirer');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
const minify = require('@node-minify/core');
const terser = require('@node-minify/terser');
var glob = require("glob")

const questions = [
    { type: 'directory', name: 'from', message: 'Source folder', basePath: process.cwd() },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
          glob(answers.from + "/**/*.js", {}, function (er, files) {
            for(i=0; i< files.length; i++){
                minify({
                    compressor: terser,
                    input: files[i],
                    output: files[i],
                    callback: function(err, min) {}
                  });
            }
        })
          
        });
};