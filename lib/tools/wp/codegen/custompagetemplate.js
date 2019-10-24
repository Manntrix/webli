const inquirer = require('inquirer');
const shell = require('shelljs')
const fs = require('fs')


const questions = [
    { type: 'list', name: 'cpaT', message: 'Select', choices: [{name:'page'}] },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
         const {stdout} =  shell.exec('wp plugin path', {silent:true})
        var pp = stdout.trim()
       
        fs.mkdirSync(pp + '/webli', { recursive: true });
        shell.cd(pp + '/webli');
        if (fs.existsSync(pp + '/webli/custom-page-templates' + '/index.php') && fs.existsSync(pp + '/webli' + '/index.php')) {
            if(answers.cpaT == 'page'){
                inquirer.prompt({type: 'input', name:'pi', message: 'Enter your page template name'}).then(function(pa){
                    fs.appendFileSync('custom-page-templates/index.php', 
`function webli_add_${pa.pi}template_to_page ($templates) {
    $templates['${pa.pi}.php'] = '${pa.pi}';
    return $templates;
    };
function webli_search_${pa.pi}template_in_plugin ($template) {
    $post = get_post(); $page_template = get_post_meta( $post->ID, '_wp_page_template', true );
    if ('${pa.pi}.php' == basename ($page_template))
        $template = WP_PLUGIN_DIR . '/webli/custom-page-templates/${pa.pi}.php';
    return $template;
    };
add_action('theme_page_templates', 'webli_add_${pa.pi}template_to_page');
add_action('page_template', 'webli_search_${pa.pi}template_in_plugin');
                    `); 
                    fs.mkdirSync('custom-page-templates', { recursive: true })
                    shell.cd('custom-page-templates')
                    fs.openSync(`${pa.pi}.php`, 'w');
                })
            }
        }else{
            if (fs.existsSync(pp + '/webli/' + 'index.php')){
                if(answers.cpaT == 'page'){
                    inquirer.prompt({type: 'input', name:'pi', message: 'Enter your page template name'}).then(function(pa){
                        fs.appendFileSync('index.php', 
                        `include('custom-page-templates/index.php');
                
                        `); 
                        fs.mkdirSync('custom-page-templates', { recursive: true })
                        shell.cd('custom-page-templates')
                        fs.openSync(`${pa.pi}.php`, 'w');
                        fs.openSync(`index.php`, 'w');
                        fs.appendFileSync('index.php', 
                `<?php 
                function webli_add_${pa.pi}template_to_page ($templates) {
                    $templates['${pa.pi}.php'] = '${pa.pi}';
                    return $templates;
                    };
                function webli_search_${pa.pi}template_in_plugin ($template) {
                    $post = get_post(); $page_template = get_post_meta( $post->ID, '_wp_page_template', true );
                    if ('${pa.pi}.php' == basename ($page_template))
                        $template = WP_PLUGIN_DIR . '/webli/custom-page-templates/${pa.pi}.php';
                    return $template;
                    };
                add_action('theme_page_templates', 'webli_add_${pa.pi}template_to_page');
                add_action('page_template', 'webli_search_${pa.pi}template_in_plugin');`); 
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

if(answers.cpaT == 'page'){
    inquirer.prompt({type: 'input', name:'pi', message: 'Enter your page template name'}).then(function(pa){
        fs.appendFileSync('index.php', `include('custom-page-templates/index.php');`); 
        fs.mkdirSync('custom-page-templates', { recursive: true })
        shell.cd('custom-page-templates')
        fs.openSync(`${pa.pi}.php`, 'w');
        fs.openSync(`index.php`, 'w');
        fs.appendFileSync('index.php', 
`<?php 
function webli_add_${pa.pi}template_to_page ($templates) {
    $templates['${pa.pi}.php'] = '${pa.pi}';
    return $templates;
    };
function webli_search_${pa.pi}template_in_plugin ($template) {
    $post = get_post(); $page_template = get_post_meta( $post->ID, '_wp_page_template', true );
    if ('${pa.pi}.php' == basename ($page_template))
        $template = WP_PLUGIN_DIR . '/webli/custom-page-templates/${pa.pi}.php';
    return $template;
    };
add_action('theme_page_templates', 'webli_add_${pa.pi}template_to_page');
add_action('page_template', 'webli_search_${pa.pi}template_in_plugin');`); 
    })
}
            }
        
}
          
        });
};