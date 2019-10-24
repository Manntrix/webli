const inquirer = require('inquirer');
const values = require('../tools-value');
const unzipper = require('unzipper')
const fs = require('fs')
var glob = require("glob")
var path = require('path')
var shell = require('shelljs');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
const fse = require('fs-extra')
const open = require('open');


const questions = [
    { type: 'list', name: 'fileDir', message: 'Import from file or directory?', choices: values.fileDirTypes },

];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            if(answers.fileDir == 'File'){
               inquirer.prompt(fQ).then(function(ans){
                fs.createReadStream(ans.file)
                .pipe(unzipper.Extract({ path: process.cwd() }))
                .on('entry', entry => entry.autodrain())
                .promise()
                .then(
                    function(){
                    var input = `${process.cwd()}/wp-config.php`
                    var hti = `${process.cwd()}/.htaccess`
                    var hto = `${process.cwd()}/.htaccess${Date.now().toString()}`
                    fs.rename(hti, hto, function(err){if(err) throw err;})
                    var output = `${process.cwd()}/wp-config-old${Date.now().toString()}.php`
                    fs.rename(input, output, function(err) {

                        if(err) throw err;
                        else{
                            shell.exec(`wp core config --dbhost=${ans.databasehost} --dbname=${ans.database} --dbuser=${ans.dbUser} --dbpass=${ans.dbpswd}`)
                            shell.exec('wp db create')
                            fs.open('wp-cli.yml', 'w', (err) => {});
fs.writeFile(`wp-cli.yml`,`
apache_modules:
    - mod_rewrite
`
, function (err) {}); 
                            glob(process.cwd() + "/*.sql", { }, function (er, files) {
                                var sq = path.basename(files[0])
                                shell.exec(`wp db import ${sq}`)
                                shell.exec(`wp option update home ${ans.nurl}`)
                                shell.exec(`wp option update siteurl ${ans.nurl}`)
                                shell.exec(`wp search-replace --url=${ans.ourl} ${ans.ourl} ${ans.nurl}`)
                                shell.exec(`wp rewrite flush --hard`, {silent: true}, function(){
                                    inquirer.prompt(rm).then(function(a){
                                        if(a.rmbkp == true){
                                            fse.remove(sq, err => { if (err) return console.error(err) })
                                            fse.remove(ans.file, err => { if (err) return console.error(err) })
                                            fse.remove('wp-cli.yml', err => { if (err) return console.error(err) })
                                             open(ans.nurl);
                                        }
                                        else{
                                           open(ans.nurl);
                                        }
                                    })
                                })
                         })
                           
                        }
                        
                    });
                       
                    }
                );
                 
             
               })
             } 
             else if(answers.fileDirType == 'Directory') {

             }
          
        });
};

const fQ = [
    { type: 'filePath', name: 'file', message: 'Select your zip file', basePath: process.cwd()},
    { type: 'input', name: 'databasehost', message: 'Enter your database host', default: 'localhost' } ,
    { type: 'input', name: 'database', message: 'Enter your database name' } ,
    { type: 'input', name: 'dbUser', message: 'Enter your database user', default: 'root' } ,
    { type: 'password', name: 'dbpswd', message: 'Enter your database password'} ,
    { type: 'input', name: 'ourl', message: 'Enter your old domain - e.g: http://localhost/newwpsite , http://www.old.com'} ,
    { type: 'input', name: 'nurl', message: 'Enter your new domain - e.g: http://localhost/oldwpsite , http://www.new.com'} ,
]
const rm = [
    { type: 'confirm', name: 'rmbkp', message: 'Do you want to remove the backup files ?', default: true } 
]