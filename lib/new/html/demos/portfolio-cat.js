const values = require('../html-value');
const inquirer = require('inquirer');
const {htmlGen} = require('../../gitconfig')
const questions = [   
    { type: 'rawlist', name: 'portfoliocat', message: 'Select the category',  choices: values.portfolioCategory}  ,
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
           if(answers.portfoliocat == 'startbootstrap-resume - BlackrockDigital'){
               link = 'https://github.com/BlackrockDigital/startbootstrap-resume.git'
               sn = answers.admincat
               htmlGen(link, sn)
           }
          
        });
}; 