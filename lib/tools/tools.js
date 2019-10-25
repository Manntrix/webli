const values = require('./tools-value');
const inquirer = require('inquirer');
const archieveGen = require('./archiever')
const extracteGen = require('./extracter')
const encryptGen = require('./encrpyter')
const decryptGen = require('./decrpyter')
const minifier = require('./minifier')
const wpCreate = require('./wp/wp')
const searchAndReplace = require('./searchandreplace')
const imageProcess = require('./imageProcessing')


const questions = [
    { type: 'list', name: 'archieveType', message: 'Select your platform', choices: values.toolsTypes }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.archieveType == 'Archieve'){
                archieveGen()
             }  
             else if (answers.archieveType == 'Extract'){
               extracteGen()
             }
             else if (answers.archieveType == 'Encrypt'){
                encryptGen()
             }
             else if (answers.archieveType == 'Decrypt'){
               decryptGen()
             }
             else if (answers.archieveType == 'Minifier'){
                minifier()
             }
             else if (answers.archieveType == 'Wordpress'){
                wpCreate()
             }
             else if (answers.archieveType == 'Search and Replace'){
               searchAndReplace()
             }
             else if (answers.archieveType == 'Image Processing'){
               imageProcess()
             }

        });
};