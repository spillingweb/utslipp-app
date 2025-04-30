<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('admin', [AdminController::class, 'index'])->name('admin');

    Route::get('admin/opprett_bruker', [UserController::class, 'create'])->name('user.create');
    Route::post('admin/opprett_bruker', [UserController::class, 'store'])->name('user.store');

    Route::get('admin/rediger_bruker/{user}', [UserController::class, 'edit'])->name('user.edit');
    
    Route::delete('admin', [UserController::class, 'destroy'])->name('user.destroy');

});
