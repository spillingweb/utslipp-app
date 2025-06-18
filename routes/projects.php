<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('prosjekter', [ProjectController::class, 'index'])->name('projects');
    Route::post('prosjekter', [ProjectController::class, 'store'])->name('project.store');

    Route::get('prosjekter/rediger_prosjekt/{project}', [ProjectController::class, 'edit'])->name('project.edit');
    
    Route::delete('prosjekter', [ProjectController::class, 'destroy'])->name('project.destroy');

});
