const inquirer = require('inquirer');
const {fileGenearator} = require('../../gitconfig')
const values = require('../react-value')


const questions = [  
    { type: 'list', name: 'pType', message: 'Select type', choices: values.PortfolioTypes },  
    { type: 'input', name: 'siteName', message: 'Enter your site name', default: 'Webli' }  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            var sitename = answers.siteName
            if(answers.pType === 'react-resume-template - tbakerx'){
                var link = 'https://github.com/tbakerx/react-resume-template.git'
                fileGenearator(link, sitename )
        }
        });
};