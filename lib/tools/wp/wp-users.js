const values = require('../tools-value');
const inquirer = require('inquirer');
const sh = require('shelljs')
const ora = require('../../oraconfig')
const {emailValidation, passwordValidation} = require ('../../validation');


const questions = [
    { type: 'list', name: 'UserType', message: 'Do you want to import or export site ?', choices: values.UserTypes },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.UserType == 'Change Username'){
                ora.usersLoading.start()
                const {stdout} = sh.exec('wp user list --format=json', {silent: true})
                const u = JSON.parse(stdout)
                var au = []
                for(i=0; i<u.length; i++){
                    var ag = u[i].user_login
                    au.push(ag)
                }
                ora.usersLoading.succeed()
              inquirer.prompt([{
                    type: 'list',
                    name: 'user',
                    message: 'Select user',
                    choices: au
              },{type: 'input', name: 'userName', message: 'Enter your new username'}]).then( ans => {
                 sh.exec(`wp db query "UPDATE wp_users SET user_login = '${ans.userName}'  WHERE user_login = '${ans.user}'"`, {silent: true})
              }

              )
             } 
             else if (answers.UserType == 'Change Password') {
                ora.usersLoading.start()
                const {stdout} = sh.exec('wp user list --format=json', {silent: true})
                const u = JSON.parse(stdout)
                var au = []
                for(i=0; i<u.length; i++){
                    var ag = u[i].user_login
                    au.push(ag)
                }
                ora.usersLoading.succeed()
              inquirer.prompt([{
                    type: 'list',
                    name: 'user',
                    message: 'Select user',
                    choices: au
              },{type: 'password', name: 'userPass', message: 'Enter your new password', validate: passwordValidation}]).then( ans => {
                 sh.exec(`wp user update ${ans.user} --user_pass=${ans.userPass}`, {silent: true})
              }

              )
             }
             else if (answers.UserType == 'Change Email') {
                ora.usersLoading.start()
                const {stdout} = sh.exec('wp user list --format=json', {silent: true})
                const u = JSON.parse(stdout)
                var au = []
                for(i=0; i<u.length; i++){
                    var ag = u[i].user_login
                    au.push(ag)
                }
                ora.usersLoading.succeed()
              inquirer.prompt([{
                    type: 'list',
                    name: 'user',
                    message: 'Select user',
                    choices: au
              },{type: 'input', name: 'userEmail', message: 'Enter your new email address', validate:emailValidation}]).then( ans => {
                 sh.exec(`wp user update ${ans.user} --user_email=${ans.userEmail}`, {silent: true})
              }

              )
             }
            
          
        });
};