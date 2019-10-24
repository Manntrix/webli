const values = require('./react-value');
const inquirer = require('inquirer');
const chart = require('./reactmodules/chart')
const image = require('./reactmodules/images')

const questions = [  
    { type: 'list', name: 'reactModuleType', message: 'Select type', choices: values.reactModuleTypes },  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.reactModuleType === 'Chart'){
                chart()
        }
        else if(answers.reactModuleType === 'Images'){
            image()
        }
        
        });
};