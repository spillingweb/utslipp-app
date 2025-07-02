<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('admin', [AdminController::class, 'index'])->name('admin');

    Route::get('admin/opprett_bruker', [UserController::class, 'create'])->name('user.create');
    Route::post('admin/opprett_bruker', [UserController::class, 'store'])->name('user.store');

    Route::get('admin/rediger_bruker/{user}', [UserController::class, 'edit'])->name('user.edit');
    Route::put('admin/rediger_bruker/{user}', [UserController::class, 'update'])->name('user.update');
    
    Route::delete('admin/delete/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    Route::get('admin/rolle/{rolle}', [AdminController::class, 'showRole'])->name('admin.role.show');
    Route::put('admin/rolle/{rolle}', [AdminController::class, 'updateRole'])->name('admin.role.update');
});
