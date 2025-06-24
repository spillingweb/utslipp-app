<?php

use App\Http\Controllers\TilsynObjectController;
use Illuminate\Support\Facades\Route;

Route::prefix('tilsynsobjekter')->controller(TilsynObjectController::class)->middleware('auth')->group(function () {
    Route::get('/', 'index')->name('tilsyn_objects');

    Route::get('/rediger/{tilsyn_object}', 'edit')->name('tilsyn_object.edit');
    Route::put('/rediger/{tilsyn_object}', 'update')->name('tilsyn_object.update');

    Route::delete('/delete/{tilsyn_object}', 'destroy')->name('tilsyn_object.destroy');
});

