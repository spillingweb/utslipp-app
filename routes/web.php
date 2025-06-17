<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TilsynObjectController;
use App\Models\Role;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [TilsynObjectController::class, 'show'])->name('utslipp');

    Route::get('/prosjekter', [ProjectController::class, 'index'])->name('projects');

    Route::get('/frister', [TilsynObjectController::class, 'index'])->name('deadlines');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
