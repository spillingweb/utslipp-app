<?php

use App\Http\Controllers\TilsynObjectController;
use Illuminate\Support\Facades\Route;

Route::prefix('tilsynsobjekter')->controller(TilsynObjectController::class)->middleware('auth')->group(function () {
    Route::get('/', 'index')->name('tilsyn_objects');
    Route::post('/', 'store')->name('tilsyn_object.store');

    Route::get('/rediger/{id}', 'edit')->name('tilsyn_object.edit');
    Route::put('/rediger/{id}', 'update')->name('tilsyn_object.update');

    Route::delete('/delete/{id}', 'destroy')->name('tilsyn_object.destroy');
});

