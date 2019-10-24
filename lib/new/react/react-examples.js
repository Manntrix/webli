
const colors = require('colors');
const values = require('./react-value');
const inquirer = require('inquirer');
var shell = require('shelljs');
const {fileGenearator} = require('../gitconfig')
const ora = require('ora');
var emoji = require('node-emoji')

const questions = [  
    { type: 'list', name: 'exType', message: 'Select type', choices: values.exampleTypes }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            var sitename = answers.exType
            if(answers.exType === 'React redux login registration - cornflourblue'){

            var link = 'https://github.com/cornflourblue/react-redux-registration-login-example.git'
                fileGenearator(link, sitename )
            

        }else if(answers.exType === 'React + Redux JWT Authentication - cornflourblue')
            {
           
            var link = "https://github.com/cornflourblue/react-redux-jwt-authentication-example.git"
            fileGenearator(link, sitename )

        }
        else if(answers.exType === 'Calculator - ahfarmer')
            {
            
            var link = "https://github.com/ahfarmer/calculator.git"
            fileGenearator(link, sitename )
           
        }
        });
};