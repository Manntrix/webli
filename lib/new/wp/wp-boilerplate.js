const inquirer = require('inquirer');
const wpPlugin = require('./wp-plugin')
const values = require('./wp-value')

const questions = [   
    { type: 'list', name: 'boilerplatetype', message: 'Select boilerplate', choices: values.boilerplateTypes } ,
];



module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.boilerplatetype == 'Plugin'){
                wpPlugin()
            }
           
        });
};