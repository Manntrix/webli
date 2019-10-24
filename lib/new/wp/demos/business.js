const wpDemoGen = require('./demosIndex')
const values = require('../wp-value');
const inquirer = require('inquirer');

const questions = [
    { type: 'list', name: 'wpDemo', message: 'Select website demo', choices: values.businessCat },  
    
];


module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            
            if(answers.wpDemo === 'Zakra Business - ThemeGrill' ){
                var url = 'https://raw.githubusercontent.com/Manntrix/Webli-WP-Sites/master/Business/ZakraBusiness-ThemeGrill.zip'
                wpDemoGen(url)
               
            }
          
        });
};