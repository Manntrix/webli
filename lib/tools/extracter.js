const inquirer = require('inquirer');
const values = require('./tools-value');
const unzipper = require('unzipper')
const fs = require('fs')
const tar = require('tar')
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
const ora = require('../oraconfig')


const questions = [
    { type: 'list', name: 'archieveType', message: 'Select your platform', choices: values.archieveTypes },
    { type: 'filePath', name: 'from', message: 'Source folder', basePath: process.cwd() },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.archieveType == 'zip'){
              ora.extractingFiles.start()
                fs.createReadStream(answers.from)
                .pipe(unzipper.Extract({ path: process.cwd() }))
                .on('entry', entry => entry.autodrain())
                .promise()
                .then()
            }
            else if(answers.archieveType == 'tar') {
              ora.extractingFiles.start()
                tar.x(  
                    {
                      file: answers.from
                    }
                  )
             }
             else if(answers.archieveType == 'gzip') {
              ora.extractingFiles.start()
                tar.x( 
                    {
                      file: answers.from
                    }
                  )
             }
        });
 
};