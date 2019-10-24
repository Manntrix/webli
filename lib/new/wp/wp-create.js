
const colors = require('colors');
const inquirer = require('inquirer');
var shell = require('shelljs');
const ora = require('ora');
const fs = require('fs')
const open = require('open');
const os = require('os')
const isRoot = require('is-root');
const {emailValidation, passwordValidation, linkValidation, folderName} = require ('../../validation');

const questions = [   
    { type: 'confirm', name: 'confirmDir', message: 'Are you on your www, html, htdocs folder ?', default: true } ,
];
const questions2 = [   
    { type: 'input', name: 'siteName', message: 'Enter your site name', default: 'webli' } ,
    { type: 'input', name: 'database', message: 'Enter your database name' } ,
    { type: 'input', name: 'dbUser', message: 'Enter your database user', default: 'root' } ,
    { type: 'password', name: 'dbpswd', message: 'Enter your database password'} ,
    { type: 'input', name: 'url', message: 'Enter your website url - e.g: http://localhost/wpsite , http://www.wpsite.com', validate: linkValidation} ,
    { type: 'input', name: 'title', message: 'Enter your site title'} ,
    { type: 'input', name: 'auser', message: 'Enter your Admin Username'} ,
    { type: 'password', name: 'apswd', message: 'Enter your desire Admin Password', validate: passwordValidation} ,
    { type: 'input', name: 'aMail', message: 'Enter your Admin Email', validate: emailValidation} ,
];


module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
           if(os.platform() === 'win32'){
           
            if(!shell.which('mysql')){
                console.log(colors.red.bold('You need to install xammp or wamp and add mysql bin folder inside your xammp or wamp installation folder to your environment variable'))
             }
             else if(shell.which('mysql')){
                if(!shell.which('wp')){
                    console.log(colors.red.bold('wp-cli is not installed in machine'))
                    const installing = ora(colors.magenta.bold('Installing wp-cli' , '\n'))
                    installing.start()
                    shell.exec('npm install wp-commandline -g')
                    installing.succeed(colors.green.bold('Installed wp-cli'))
                    if(answers.confirmDir == true){
                        inquirer.prompt(questions2).then(function (ans){
                            fs.mkdirSync(ans.siteName, { recursive: true }, (err) => {
                                if (err) throw err;
                                shell.cd(ans.siteName);
                              });
                              shell.cd(ans.siteName);
                              shell.exec('wp core download')
                              shell.exec(`wp core config --dbname=${ans.database} --dbuser=${ans.dbUser} --dbpass=${ans.dbpswd}`)
                              shell.exec('wp db create')
                              shell.exec(`wp core install --url=${ans.url}  --title=${ans.title} --admin_user=${ans.auser} --admin_password=${ans.apswd} --admin_email=${ans.aMail}`)

                              open(ans.url);
                        })
                       
                    }
                    else{
                        console.log(colors.red.bold('Go to your www, html or htdocs folder'))
                    }
                    
                }
                else{
                    if(answers.confirmDir == true){
                        inquirer.prompt(questions2).then(function (ans){
                            fs.mkdirSync(ans.siteName, { recursive: true }, (err) => {
                                if (err) throw err;
                              });
                              shell.cd(ans.siteName);
                              shell.exec('wp core download')
                              shell.exec(`wp core config --dbname=${ans.database} --dbuser=${ans.dbUser} --dbpass=${ans.dbpswd}`)
                              shell.exec('wp db create')
                              shell.exec(`wp core install --url=${ans.url}  --title=${ans.title} --admin_user=${ans.auser} --admin_password=${ans.apswd} --admin_email=${ans.aMail}`)

                              open(ans.url);
                        })
                       
                    }
                    else{
                        console.log(colors.red.bold('Go to your www, html or htdocs folder'))
                    }
                }
             }
           }
           else if(os.platform() == 'linux'){
               if(isRoot()){

            if(!shell.which('mysql')){
                console.log(colors.red.bold('You need to install xammp or wamp and add mysql bin folder inside your xammp or wamp installation folder to your environment variable'))
             }
             else if(shell.which('mysql')){
                if(!shell.which('wp')){
                    console.log(colors.red.bold('wp-cli is not installed in machine'))
                    const installing = ora(colors.magenta.bold('Installing wp-cli' , '\n'))
                    installing.start()
                    shell.exec('npm install wp-commandline -g')
                    installing.succeed(colors.green.bold('Installed wp-cli'))
                    if(answers.confirmDir == true){
                        inquirer.prompt(questions2).then(function (ans){
                            fs.mkdirSync(ans.siteName, { recursive: true }, (err) => {
                                if (err) throw err;
                                shell.cd(ans.siteName);
                              });
                              shell.cd(ans.siteName);
                              shell.exec('wp core download --allow-root')
                              shell.exec(`wp core config --dbname=${ans.database} --dbuser=${ans.dbUser} --dbpass=${ans.dbpswd} --allow-root`)
                              shell.exec('wp db create --allow-root')
                              shell.exec(`wp core install --url=${ans.url}  --title=${ans.title} --admin_user=${ans.auser} --admin_password=${ans.apswd} --admin_email=${ans.aMail} --allow-root`)

                              open(ans.url);
                        })
                       
                    }
                    else{
                        console.log(colors.red.bold('Go to your www, html or htdocs folder'))
                    }
                    
                }
                else{
                    if(answers.confirmDir == true){
                        inquirer.prompt(questions2).then(function (ans){
                            fs.mkdirSync(ans.siteName, { recursive: true }, (err) => {
                                if (err) throw err;
                              });
                              shell.cd(ans.siteName);
                              shell.exec('wp core download --allow-root')
                              shell.exec(`wp core config --dbname=${ans.database} --dbuser=${ans.dbUser} --dbpass=${ans.dbpswd} --allow-root`)
                              shell.exec('wp db create --allow-root')
                              shell.exec(`wp core install --url=${ans.url}  --title=${ans.title} --admin_user=${ans.auser} --admin_password=${ans.apswd} --admin_email=${ans.aMail} --allow-root`)

                              open(ans.url);
                        })
                       
                    }
                    else{
                        
                    }
                }
             }
            }
            else{
                console.log(colors.red('You have to run this command in administrator mode / sudo'))
            }
           }
        });
};