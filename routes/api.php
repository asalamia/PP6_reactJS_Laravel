<?php

use Illuminate\Contracts\Http\Kernel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;

use Illuminate\Support\Facades\Crypt;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerLoginController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/product', [ProductController::class, 'index']);  // Fetch all products
Route::get('/product/{id}', [ProductController::class, 'show']);  // Fetch single product by ID
Route::post('/product', [ProductController::class, 'store']);  // Create a new product

Route::get('/product/{product}/edit', [ProductController::class, 'edit']);
Route::post('/product/{product}/edited', [ProductController::class, 'edited']);  // Edit product by ID

Route::delete('/product/{product}/destroy', [ProductController::class, 'destroy']);  // Delete product by ID

Route::get('/register', [RegisteredUserController::class, 'create']);
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/login', [AuthenticatedSessionController::class, 'create']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/api/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:api')->name('logout');

//Route::get('/register/{profile}/edit', [ProfileController::class, 'edit']);
//Route::post('/register/{profile}/edited', [ProfileController::class, 'edited']);  // Edit profile by ID

Route::post('/profile/{userId}/edited', [ProfileController::class, 'edited']);

Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
    ->name('password.request');
Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
    ->name('password.email');
Route::post('reset-password', [NewPasswordController::class, 'store'])
    ->name('password.update');



/* Customer User Side API */

Route::get('/registerCustomer', [CustomerController::class, 'create']);
Route::post('/registerCustomer', [CustomerController::class, 'store']);

Route::get('/loginCustomer', [CustomerLoginController::class, 'create']);
Route::post('/loginCustomer', [CustomerLoginController::class, 'store']);

Route::post('/api/logoutCustomer', [CustomerLoginController::class, 'destroy'])->middleware('auth:api')->name('logoutCustomer');



