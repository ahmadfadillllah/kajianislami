<?php

use App\Http\Controllers\AStarController;
use App\Http\Controllers\FloydWarshallController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('show-mosque/floyd', [FloydWarshallController::class, 'showMosque']);
Route::get('show-mosque/astar', [AStarController::class, 'showMosque']);
Route::get('show-mosque/rute', [FloydWarshallController::class, 'show_rute']);
