const values = require('./tools-value');
const inquirer = require('inquirer');
var fs = require('fs');
var archiver = require('archiver');
var crypto = require('crypto');
const tar = require('tar')
var fse = require('fs-extra')
const zlib = require('zlib');
const unzipper = require('unzipper')
inquirer.registerPrompt('filePath', require('inquirer-file-path'));


const questions = [
    { type: 'filePath', name: 'from', message: 'Source folder', basePath: process.cwd() },
    { type: 'password', name: 'password', message: 'Enter your decryption password' }
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            const getCipherKey = (password) => {
                return crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32);
              }
           
            function decrypt({ file, password }) {
                const readInitVect = fs.createReadStream(file, { end: 15 });
                let initVect;
                readInitVect.on('data', (chunk) => {
                  initVect = chunk;
                });
                readInitVect.on('close', () => {
                  const cipherKey = getCipherKey(password);
                  const readStream = fs.createReadStream(file, { start: 16 });
                  const decipher = crypto.createDecipheriv('aes-256-ctr', cipherKey, initVect);
                 
                  const writeStream = fs.createWriteStream(file + '.zip');
              
                  readStream
                    .pipe(decipher)
                    .pipe(unzipper.Extract({ path: process.cwd() }))
                    .pipe(writeStream)
                    
                });
              }
              decrypt({ file: answers.from, password: answers.password });
                    
            
        });
};