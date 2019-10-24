const inquirer = require('inquirer');
const {fileGenearator} = require('../gitconfig')


const questions = [   
    { type: 'input', name: 'siteName', message: 'Enter your react project name', default: 'webli' }  
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            var sitename = answers.siteName
                var link = 'https://github.com/Manntrix/react-app-starter.git'
                fileGenearator(link, sitename )
        
        });
};