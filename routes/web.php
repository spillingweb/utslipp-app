<?php

use App\App\Http\Controllers\WmsProxyController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'login');

Route::middleware(['auth'])->group(function () {
    Route::get('/', [MapController::class, 'index'])->name('map');
    Route::post('/', [MapController::class, 'filter'])->name('map.filter');

    Route::post('/store', [MapController::class, 'store'])->name('map.store');
    Route::put('/update/{tilsyn_object}', [MapController::class, 'update'])->name('map.update');
    Route::delete('/delete/{tilsyn_object}', [MapController::class, 'destroy'])->name('map.destroy');

    Route::get('/wms_proxy', [WmsProxyController::class, 'getTile'])->name('wms.proxy');

    Route::get('/auth/microsoft/redirect', [SocialiteController::class, 'redirect']);
    Route::get('/auth/microsoft/callback', [SocialiteController::class, 'callback']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/projects.php';
require __DIR__ . '/tilsynObjects.php';