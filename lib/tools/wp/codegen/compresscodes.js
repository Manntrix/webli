const shell = require('shelljs')
const fs = require('fs')
const https = require('https');


module.exports = function () {
    const {stdout} =  shell.exec('wp plugin path', {silent:true})
        var pp = stdout.trim()
    if(fs.existsSync(pp + '/webli/' + '/index.php')){
        if (fs.existsSync(pp + '/webli/compress' + '/index.php')) {
            console.log('Compress code already exist')
        }
        else{
            shell.cd(pp + '/webli');
            fs.appendFileSync('index.php', 
            `include('compress/index.php');`);
            fs.mkdirSync('compress', { recursive: true })
            shell.cd('compress');
            const file = fs.createWriteStream("index.php");
            const request = https.get("https://gist.githubusercontent.com/sethbergman/d07e879200bef6862131/raw/ab62634a74eef4aba1bf4c4eff33c0536d6e9394/WP-HTML-Compression", function(response) {
            response.pipe(file);
                });
        }
    }
    else{
        fs.mkdirSync(pp + '/webli', { recursive: true });
        shell.cd(pp + '/webli');
        fs.openSync('index.php', 'w');
        fs.writeFileSync(`index.php`,`<?php
        /**
        * The plugin bootstrap file
        *
        * This file is read by WordPress to generate the plugin information in the plugin
        * admin area. This file also includes all of the dependencies used by the plugin,
        * registers the activation and deactivation functions, and defines a function
        * that starts the plugin.
        *
        * @link              http://manntrix.com
        * @since             1.0.0
        * @package           Webli
        *
        * @wordpress-plugin
        * Plugin Name:       Webli
        * Plugin URI:        http://manntrix.com
        * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
        * Version:           1.0.0
        * Author:            Manish Mandal
        * Author URI:        http://manntrix.com
        * License:           GPL-2.0+
        * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
        * Text Domain:       webli
        * Domain Path:       /languages
        */

       include('compress/index.php');
        `
        , function (err) {});
        fs.mkdirSync('compress', { recursive: true })
         shell.cd('compress');
         const file = fs.createWriteStream("index.php");
         const request = https.get("https://gist.githubusercontent.com/sethbergman/d07e879200bef6862131/raw/ab62634a74eef4aba1bf4c4eff33c0536d6e9394/WP-HTML-Compression", function(response) {
         response.pipe(file);
             }); 
    }
   
};