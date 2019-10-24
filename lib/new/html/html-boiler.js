const values = require('./html-value');
const inquirer = require('inquirer');
const https = require('https');
const fs = require('fs');
const unzipper = require('unzipper')

const questions = [   
    { type: 'list', name: 'listboiler', message: 'Select the category',  choices: values.htmlBoiler}  ,
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
           if(answers.listboiler == 'html5boilerplate'){
            const file = fs.createWriteStream("htmlboiler.zip");
            https.get("https://gitlab.com/Manntrix/html5boilerplate/raw/master/html5boilerplate.zip", function(response) {
              response.pipe(file);
              response.on('end', function(){
                fs.createReadStream('./htmlboiler.zip')
                .pipe(unzipper.Extract({ path: process.cwd() }))
                .on('entry', entry => entry.autodrain())
                .promise()
                .then()
              })
            });
           }   
        });
}; 