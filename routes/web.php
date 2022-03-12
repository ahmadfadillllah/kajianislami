<?php

use App\Http\Controllers\AStarController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FloydWarshallController;
use App\Http\Controllers\KajianIslamiController;
use App\Http\Controllers\SaranController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home.index');
});

Route::get('/about', function () {
    return view('home.about');
});

Route::get('/saran',[SaranController::class, 'index'])->name('saran');
Route::post('/saran-post',[SaranController::class, 'post'])->name('saran-post');

Route::get('/login',[AuthController::class, 'login'])->name('login');
Route::post('/post-login',[AuthController::class, 'postLogin'])->name('post-login');



Route::get('/register',[AuthController::class, 'register'])->name('register');


Route::get('/dashboard/index',[DashboardController::class, 'index'])->name('dashboard.index');


// Kajian Islami
Route::get('/dashboard/kajian-islami', [KajianIslamiController::class, 'index'])->name('kajianislami');
Route::post('/dashboard/kajian-islami/store', [KajianIslamiController::class, 'store'])->name('kajianislami.store');
Route::get('/dashboard/kajian-islami/{id}/edit', [KajianIslamiController::class, 'edit']);
Route::post('/dashboard/kajian-islami/{id}/update', [KajianIslamiController::class, 'update']);
Route::get('/dashboard/kajian-islami/{id}/destroy', [KajianIslamiController::class, 'destroy']);

//Algoritma Floyd Warshall
Route::get('/dashboard/floyd-warshall',[FloydWarshallController::class, 'index'])->name('floydwarshall.index');

//Algoritma A Star
Route::get('/dashboard/a-star',[AStarController::class, 'index'])->name('astar.index');

