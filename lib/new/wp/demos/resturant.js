const wpDemoGen = require('./demosIndex')
const values = require('../wp-value');
const inquirer = require('inquirer');

const questions = [
    { type: 'list', name: 'rest', message: 'Select website demo', choices: values.resturantCat },  
    
];


module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            
            if(answers.rest === 'Zakra Resturant - ThemeGrill' ){
                var url = 'https://raw.githubusercontent.com/Manntrix/Webli-WP-Sites/master/Resturant/ZakraRestura-ThemeGrill.zip'
                wpDemoGen(url)
               
            }
          
        });
};