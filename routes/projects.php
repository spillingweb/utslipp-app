<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::prefix('prosjekter')->controller(ProjectController::class)
    ->middleware('auth')
    ->group(function () {
        Route::get('/', 'index')->name('projects');
        Route::post('/', 'store')->name('project.store');

        Route::get('/rediger/{project}', 'edit')->name('project.edit');
        Route::put('/rediger/{project}', 'update')->name('project.update');

        Route::delete('/delete/{project}', 'destroy')->name('project.destroy');
    });

