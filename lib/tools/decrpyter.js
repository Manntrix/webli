const values = require('./tools-value');
const inquirer = require('inquirer');
var fs = require('fs');
var archiver = require('archiver');
var crypto = require('crypto');
var archiver = require('archiver');
var fse = require('fs-extra')

inquirer.registerPrompt('directory', require('inquirer-select-directory'));

const questions = [
    { type: 'directory', name: 'from', message: 'Source folder', basePath: process.cwd() },
    { type: 'password', name: 'password', message: 'Enter your encryption password' },
    { type: 'input', name: 'target', message: 'Enter your archieve name', default: 'webli' }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
                var output = fs.createWriteStream(`${answers.target}.zip`);
                var archive = archiver('zip');

                output.on('close', function () {
                    var secret =  answers.password;
                    var key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
                    var iv = new Buffer.from(crypto.randomBytes(8))
                    ivstring = iv.toString('hex');
                    var cipher = crypto.createCipheriv('aes-256-gcm', key, ivstring);
                    var input = fs.createReadStream(`${answers.target}.zip`);
                    var output = fs.createWriteStream(`${answers.target}.webli`);
                    
                    input.pipe(cipher).pipe(output);
                    
                    output.on('finish', function() {
                        fse.remove(`${answers.target}.zip`) .then(() => { 

                            }) .catch(err => { console.error(err) })
                    });
                });

                archive.on('error', function(err){
                    throw err;
                });

                archive.pipe(output);
                archive.directory(answers.from, false)


                archive.finalize();
            
        });
};