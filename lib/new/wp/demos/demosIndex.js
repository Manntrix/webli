const inquirer = require('inquirer');
const unzipper = require('unzipper')
const fs = require('fs')
var glob = require("glob")
var path = require('path')
var shell = require('shelljs');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
const fse = require('fs-extra')
const open = require('open');

const https = require('https');
const colors = require('colors');
const {emailValidation, passwordValidation, linkValidation, folderName} = require ('../../../validation.js');
const ora = require('../../../oraconfig')

const q = [
    { type: 'confirm', name: 'confirmDir', message: 'Are you on your www, html, htdocs folder ?', default: true }
]
 
const questions = [
   
    { type: 'input', name: 'siteName', message: 'Enter your site name', default: 'webli', validate: folderName} ,
    { type: 'input', name: 'databasehost', message: 'Enter your database host', default: 'localhost' } ,
    { type: 'input', name: 'database', message: 'Enter your database name' } ,
    { type: 'input', name: 'dbUser', message: 'Enter your database user', default: 'root' } ,
    { type: 'password', name: 'dbpswd', message: 'Enter your database password'} ,
    { type: 'input', name: 'nurl', message: 'Enter your website url - e.g: http://localhost/wpsite , http://www.wpsite.com', validate: linkValidation} ,
    { type: 'input', name: 'title', message: 'Enter your site title'} ,
    { type: 'input', name: 'auser', message: 'Enter your Admin Username'} ,
    { type: 'password', name: 'apswd', message: 'Enter your Admin Password', validate: passwordValidation} ,
    { type: 'input', name: 'aMail', message: 'Enter your Admin Email', validate: emailValidation} ,
    
];

module.exports = function (url) {
    if(!shell.which('wp')){
        console.log(colors.red.bold('wp cli is not installed in your machine run : npm install wp-commandline -g to install wp cli'))
     }
     else{
    inquirer.prompt(q).then(function(a){
        if(a.confirmDir == true){
            inquirer
            .prompt(questions)
            .then(function (ans) {
    
               
    
             fs.mkdir(ans.siteName, { recursive: true },(err) => {
                ora.generating.start()
                    if (err) throw err;
                    shell.cd(ans.siteName)
                    var file = fs.createWriteStream('file.zip');
                    https.get(url, function(response) {
                        response.pipe(file)
                        response.on('end', function(){
                            fs.createReadStream('./file.zip')
                    .pipe(unzipper.Extract({ path: process.cwd() }))
                    .on('entry', entry => entry.autodrain())
                    .promise()
                    .then(
                      function(){
                        ora.generating.succeed(); 
                        fse.removeSync('.htaccess')
                        fse.removeSync('wp-config.php')
                        ora.configDatabase.start()
                        shell.exec(`wp core config --dbhost=${ans.databasehost} --dbname=${ans.database} --dbuser=${ans.dbUser} --dbpass=${ans.dbpswd}`, {silent: true})
                        ora.configDatabase.succeed()
                       
                        shell.exec('wp db create', {silent: true})
                       
                        fs.open('wp-cli.yml', 'w', (err) => {});
    fs.writeFile(`wp-cli.yml`,`
    apache_modules:
    - mod_rewrite
    `
    , function (err) {}); 
                        glob("*.sql", { }, function (er, files) {
                            var sq = path.basename(files[0])
                            ora.importDatabase.start()
                            shell.exec(`wp db import ${sq}`, {silent: true})
                            ora.importDatabase.succeed()
                            ora.changeURL.start()
                            shell.exec(`wp option update home ${ans.nurl}`, {silent: true})
                            shell.exec(`wp option update siteurl ${ans.nurl}`, {silent: true})
                            shell.exec(`wp option update admin_email ${ans.aMail}`, {silent: true})
                            shell.exec(`wp option update blogname ${ans.title}`, {silent: true})
                            shell.exec(`wp search-replace --url='http://localhost/webli' 'http://localhost/webli' ${ans.nurl}`, {silent: true})
                            ora.changeURL.succeed()
                            shell.exec(`wp rewrite flush --hard`, {silent: true}, function(){
                                fse.removeSync('wp-cli.yml')
                            })
                            shell.exec(`wp user create ${ans.auser} ${ans.aMail} --role=administrator --user_pass=${ans.apswd}`, {silent: true})
                            shell.exec(`wp user delete Admin --reassign=${ans.auser}`, {silent: true})
                            ora.removeBackup.start()
                            fse.removeSync('file.zip')
                            fse.removeSync('database.sql')
                            ora.removeBackup.succeed()
                           
                     })
                      }
                    )
                        })
                       
                      });
                  })
        })
        }
    else{
        console.log(colors.red.bold('Go to your www, html or htdocs folder'))
    }
    })}}

