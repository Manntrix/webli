const colors = require('colors');
const values = require('./html-value');
const inquirer = require('inquirer');
var shell = require('shelljs');
const ora = require('ora');
const fs = require('fs')
const open = require('open');
const os = require('os')
const https = require('https');

const questions = [   
    { type: 'input', name: 'siteName', message: 'Enter your site name', default: 'webli' }  ,
    { type: 'checkbox', name: 'cssplugins', message: 'Select css plugins you want', choices: values.cssPluginsList} ,
    { type: 'checkbox', name: 'jsplugins', message: 'Select js plugins you want', choices: values.jsPluginsList} ,
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            fs.mkdirSync(answers.siteName, { recursive: true }, (err) => { });
            shell.cd(answers.siteName);
            fs.openSync('index.html', 'w');
            fs.openSync('robots.txt', 'w');
            fs.openSync('404.html', 'w');
            var ac = answers.cssplugins
            var c = ''
            for(i=0; i< ac.length; i++){
              c += `<link rel="stylesheet" href="css/vendor/${ac[i].toLowerCase()}.min.css"> \n` 
          }
            var ar = answers.jsplugins
            var b = ''
            for(i=0; i< ar.length; i++){
                b += `<script src="js/vendor/${ar[i].toLowerCase()}.min.js"></script> \n` 
            }

           
            fs.writeFileSync(`index.html`,`<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>${answers.siteName}</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    ${c}
  <link rel="stylesheet" href="css/style.css">
  <meta name="theme-color" content="#fafafa">
</head>

<body>

  <p>Hello world! This is ${answers.siteName}.</p>
    ${b}
  <script src="js/main.js"></script>
</body>

</html>
            
`
, function (err) {}); 

fs.writeFile('robots.txt', `# www.robotstxt.org/

# Allow crawling of all content
User-agent: *
Disallow:
`, function (err) {})
            fs.mkdirSync('js', { recursive: true }, (err) => {});
            fs.mkdirSync('css', { recursive: true }, (err) => {})
            shell.cd('js') 
            fs.open('main.js', 'w', (err) => {});
            fs.mkdirSync('vendor', { recursive: true }, (err) => {
            })
            shell.cd('vendor')

            var jpl = answers.jsplugins
            var jl = values.jsLinks
            var jli = Object.keys(jl[0])

            for(i=0; i<jpl.length; i++){
              for(j=0; j<jli.length; j++){
              if(jpl[i] == jli[j]){
              var d = jli[j]
              jl.map(function (el) {
                 const file = fs.createWriteStream(`${d}.min.js`);
                 const request = https.get(el[d], function(response) {
                   response.pipe(file);
                 });
                 
             })
              }
              }
                }

              shell.cd('..')

            shell.cd('..')
            shell.cd('css') 
            fs.open('style.css', 'w', (err) => {});
            fs.mkdirSync('vendor', { recursive: true }, (err) => {})
            shell.cd('vendor')

            var cpl = answers.cssplugins
            var cl = values.cssLinks
            var cli = Object.keys(cl[0])

            for(i=0; i<cpl.length; i++){
              for(j=0; j<cli.length; j++){
              if(cpl[i] == cli[j]){
              var d = cli[j]
              cl.map(function (el) {
                 const file = fs.createWriteStream(`${d}.min.css`);
                 const request = https.get(el[d], function(response) {
                   response.pipe(file);
                 });
                 
             })
              }
              }
                }
        });
}; 