const inquirer = require('inquirer');
const {fileGenearator} = require('../../gitconfig')
const values = require('../react-value')


const questions = [  
    { type: 'list', name: 'lType', message: 'Select type', choices: values.landingTypes },  
    { type: 'input', name: 'siteName', message: 'Enter your site name', default: 'Webli' }  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            var sitename = answers.siteName
            if(answers.lType === 'React-Landing-Template - AldoHub'){
                var link = 'https://github.com/AldoHub/React-Landing-Template.git'
                fileGenearator(link, sitename )
        }
        });
};