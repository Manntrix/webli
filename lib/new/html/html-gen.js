const values = require('./html-value');
const inquirer = require('inquirer');
const htmlCreate = require('./html-create')
const demoGen = require('./html-demos')
const htmlBoil = require('./html-boiler')

const questions = [
    { type: 'list', name: 'htmlType', message: 'Select your platform', choices: values.htmlTypes },  
    
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            
            if(answers.htmlType === 'Create' ){
                htmlCreate()   
            }
            else if(answers.htmlType === 'Boilerplate'){
                htmlBoil()
            }
            else if(answers.htmlType === 'Demos'){
                demoGen()
            }
        });
};