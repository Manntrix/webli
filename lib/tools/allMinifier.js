const inquirer = require('inquirer');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
const minify = require('@node-minify/core');
const cssnano = require('@node-minify/cssnano');
const terser = require('@node-minify/terser');
const htmlminifier = require('@node-minify/html-minifier');
var glob = require("glob")

const questions = [
    { type: 'directory', name: 'from', message: 'Source folder', basePath: process.cwd() },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
         glob(answers.from + "/**/*.html", {}, function (er, files) {
                for(i=0; i< files.length; i++){
                    minify({
                        compressor: htmlminifier,
                        input: files[i],
                        output: files[i],
                        callback: function(err, min) {}
                      });
                }
            })
          glob(answers.from + "/**/*.css", {}, function (er, files) {
            for(i=0; i< files.length; i++){
                minify({
                    compressor: cssnano,
                    input: files[i],
                    output: files[i],
                    callback: function(err, min) {}
                  });
            }
        })
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