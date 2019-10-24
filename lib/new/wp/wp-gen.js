const values = require('./wp-value');
const inquirer = require('inquirer');
const WPCreate = require('./wp-create')
const WPboilerplate = require('./wp-boilerplate')
const WPdemos = require('./wp-demo')

const questions = [
    { type: 'list', name: 'WPType', message: 'Select your platform', choices: values.WPTypes },  
    
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            
            if(answers.WPType === 'Create' ){
                WPCreate()
            }
            else if(answers.WPType === 'Boilerplate'){
                WPboilerplate()
            }
            else if(answers.WPType === 'Demos'){
                WPdemos()
            }
        });
};