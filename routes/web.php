<?php

use App\Http\Controllers\AStarController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FloydWarshallController;
use App\Http\Controllers\KajianIslamiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaranController;
use App\Http\Controllers\TestingController;
use App\Http\Controllers\UserController;
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

Route::get('/saran', [SaranController::class, 'index'])->name('saran');
Route::post('/saran-post', [SaranController::class, 'post'])->name('saran-post');

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/post-login', [AuthController::class, 'postLogin'])->name('post-login');
Route::post('/post-register', [AuthController::class, 'post_register'])->name('post-register');
Route::get("/logout", [AuthController::class, 'logout'])->name("logout");


Route::get('/register', [AuthController::class, 'register'])->name('register');

Route::group(['middleware' => ['auth', 'checkRole:admin']], function(){


    Route::get('/dashboard/index', [DashboardController::class, 'index'])->name('dashboard.index');

// Kajian Islami
    Route::get('/dashboard/kajian-islami', [KajianIslamiController::class, 'index'])->name('kajianislami');
    Route::post('/dashboard/kajian-islami/store', [KajianIslamiController::class, 'store'])->name('kajianislami.store');
    Route::get('/dashboard/kajian-islami/{id}/edit', [KajianIslamiController::class, 'edit']);
    Route::post('/dashboard/kajian-islami/{id}/update', [KajianIslamiController::class, 'update']);
    Route::get('/dashboard/kajian-islami/{id}/destroy', [KajianIslamiController::class, 'destroy']);
    Route::get('/dashboard/kajian-islami/tambah-rute', [KajianIslamiController::class, 'tambah_rute'])->name("kajian-islami-tambah-rute");
    Route::post('/dashboard/kajian-islami/tambah-rute/store', [KajianIslamiController::class, 'tambah_rute_store'])->name("kajian-islami-tambah-rute-store");

//Algoritma Floyd Warshall
    Route::get('/dashboard/floyd-warshall', [FloydWarshallController::class, 'index'])->name('floydwarshall.index');
    Route::post('/dashboard/floyd-warshall', [FloydWarshallController::class, 'store'])->name('floydwarshall.store');

//Algoritma A Star
    Route::get('/dashboard/a-star', [AStarController::class, 'index'])->name('astar.index');
    Route::post('/dashboard/a-star', [AStarController::class, 'store'])->name('astar.store');

//Pengguna
    Route::get('/dashboard/list-pengguna', [UserController::class, 'index'])->name('user.index');
    Route::get('/dashboard/list-pengguna/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');

//Profile
    Route::get('/dashboard/profile', [ProfileController::class, 'index'])->name('profile.index');
});

Route::group(['middleware' => ['auth', 'checkRole:admin,masyarakatumum']], function(){


    Route::get('/dashboard/index', [DashboardController::class, 'index'])->name('dashboard.index');
//Algoritma Floyd Warshall
    Route::get('/dashboard/floyd-warshall', [FloydWarshallController::class, 'index'])->name('floydwarshall.index');
    Route::post('/dashboard/floyd-warshall', [FloydWarshallController::class, 'store'])->name('floydwarshall.store');

//Algoritma A Star
    Route::get('/dashboard/a-star', [AStarController::class, 'index'])->name('astar.index');
    Route::post('/dashboard/a-star', [AStarController::class, 'store'])->name('astar.store');

//Pengguna
    Route::get('/dashboard/list-pengguna', [UserController::class, 'index'])->name('user.index');
    Route::get('/dashboard/list-pengguna/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');

//Profile
    Route::get('/dashboard/profile', [ProfileController::class, 'index'])->name('profile.index');
});


Route::get('/testing', [TestingController::class, 'index'])->name("testing");
