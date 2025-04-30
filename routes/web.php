<?php

use App\Http\Controllers\AdminController;
use App\Models\Role;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Map');
    })->name('utslipp');

    Route::get('/prosjekter', function () {
        return Inertia::render('Projects');
    })->name('projects');

    Route::get('/frister', function () {
        return Inertia::render('Deadlines');
    })->name('deadlines');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
