const values = require('./react-value');
const inquirer = require('inquirer');
const reactWeb = require('./react-websites')
const reactEx = require('./react-examples')
const reactCr = require('./react-create')
const reactModule = require('./react-modules')


const questions = [
    { type: 'list', name: 'defaultType', message: 'Select your react option', choices: values.reactTypes },  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.defaultType === 'Website' ){
                reactWeb()
            }
            else if(answers.defaultType === 'Examples'){
                reactEx()
            }
            else if(answers.defaultType === 'Create'){
                reactCr()
            }
            else if(answers.defaultType === 'NPM Modules'){
                reactModule()
            }
        });
};