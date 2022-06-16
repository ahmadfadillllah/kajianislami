const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/tambah_rute.js', 'public/js/tambah_rute.js')
    .js('resources/js/floyd_warshall.js', 'public/js/floyd_warshall.js')
    .js('resources/js/astar.js', 'public/js/astar.js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
