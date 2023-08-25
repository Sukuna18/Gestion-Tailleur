<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('categories', 'App\Http\Controllers\CategorieController')->parameter('categories', 'categorie');
Route::post('/categories/delete', [App\Http\Controllers\CategorieController::class, 'deleteEach']);
Route::get('/categories/search/{libelle}', [App\Http\Controllers\CategorieController::class, 'search']);
Route::apiResource('articles', 'App\Http\Controllers\ArticleController')->parameter('articles', 'article');
Route::apiResource('ventes', 'App\Http\Controllers\ArticleVenteController')->parameter('ventes', 'articleVente');