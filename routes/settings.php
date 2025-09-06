<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('innstillinger', 'innstillinger/profil');

    Route::get('innstillinger/profil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('innstillinger/profil', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('innstillinger/passord', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('innstillinger/passord', [PasswordController::class, 'update'])->name('password.update');
});
