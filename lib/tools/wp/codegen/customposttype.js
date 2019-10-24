const inquirer = require('inquirer');
const shell = require('shelljs')
const fs = require('fs')


const questions = [
    { type: 'list', name: 'cptT', message: 'Select', choices: [{name:'Basic'}] },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
         const {stdout} =  shell.exec('wp plugin path', {silent:true})
        var pp = stdout.trim()
       
        fs.mkdirSync(pp + '/webli', { recursive: true });
        shell.cd(pp + '/webli');
        if (fs.existsSync(pp + '/webli/custom-post-type' + '/index.php') && fs.existsSync(pp + '/webli' + '/index.php')) {
            if(answers.cptT == 'Basic'){
                inquirer.prompt([{type: 'input', name:'pts', message: 'Enter your Post Type Slug'},{type:'input', name: 'plural', message: 'Enter your Plural Label'},{type:'input', name: 'singular', message: 'Enter your Singular Label'}]).then(function(pa){
                    fs.appendFileSync('custom-post-type/index.php', 
`
function webli_create_posttype_${pa.pts}() {
    register_post_type( '${pa.pts.toLowerCase()}',
        array(
            'labels' => array(
                'name' => __( '${pa.plural}' ),
                'singular_name' => __( '${pa.singular}' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => '${pa.pts.toLowerCase()}'),
        )
    );
}
add_action( 'init', 'webli_create_posttype_${pa.pts}' );`); 
                    fs.mkdirSync('custom-post-type', { recursive: true })
                    shell.cd('custom-post-type')
                  
                })
            }
        }
        else{
       if (fs.existsSync(pp + '/webli/' + 'index.php')){
        if(answers.cptT == 'Basic'){
            inquirer.prompt([{type: 'input', name:'pts', message: 'Enter your Post Type Slug'},{type:'input', name: 'plural', message: 'Enter your Plural Label'},{type:'input', name: 'singular', message: 'Enter your Singular Label'}]).then(function(pa){
                fs.appendFileSync('index.php', `
        include('custom-post-type/index.php');`); 
                fs.mkdirSync('custom-post-type', { recursive: true })
                shell.cd('custom-post-type')
                fs.openSync(`index.php`, 'w');
                fs.appendFileSync('index.php', 
`<?php function webli_create_posttype_${pa.pts}() {
    register_post_type( '${pa.pts}',
        array(
            'labels' => array(
                'name' => __( '${pa.plural}' ),
                'singular_name' => __( '${pa.singular}' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => '${pa.pts}'),
        )
    );
}
add_action( 'init', 'webli_create_posttype_${pa.pts}' );`); 
            })
        }
       }
       else{
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
`
, function (err) {}); 

if(answers.cptT == 'Basic'){
    inquirer.prompt([{type: 'input', name:'pts', message: 'Enter your Post Type Slug'},{type:'input', name: 'plural', message: 'Enter your Plural Label'},{type:'input', name: 'singular', message: 'Enter your Singular Label'}]).then(function(pa){
        fs.appendFileSync('index.php', 
`include('custom-post-type/index.php');`); 
        fs.mkdirSync('custom-post-type', { recursive: true })
        shell.cd('custom-post-type')
        fs.openSync(`index.php`, 'w');
        fs.appendFileSync('index.php', 
`<?php function webli_create_posttype_${pa.pts}() {
    register_post_type( '${pa.pts.toLowerCase()}',
        array(
            'labels' => array(
                'name' => __( '${pa.plural}' ),
                'singular_name' => __( '${pa.singular}' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => '${pa.pts.toLowerCase()}'),
        )
    );
}
add_action( 'init', 'webli_create_posttype_${pa.pts}' );`); 
    })
}
       }

}
          
        });
};