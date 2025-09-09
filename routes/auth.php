<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('glemt-passord', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('glemt-passord', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('tilbakestill-passord/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('tilbakestill-passord', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
