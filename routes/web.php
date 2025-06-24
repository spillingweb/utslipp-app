<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TilsynObjectController;
use App\Models\Role;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [MapController::class, 'index'])->name('map');
    Route::post('/', [MapController::class, 'store'])->name('map.store');

    Route::put('/update/{tilsyn_object}', [MapController::class, 'update'])->name('map.update');
    Route::delete('/delete/{tilsyn_object}', [MapController::class, 'destroy'])->name('map.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/projects.php';
require __DIR__ . '/tilsynObjects.php';