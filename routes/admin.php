<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::redirect('admin', 'admin/brukere');
    Route::get('admin/brukere', [AdminController::class, 'index'])->name('admin.users');
    Route::delete('admin/brukere/slett/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    Route::get('admin/brukere/opprett', [UserController::class, 'create'])->name('user.create');
    Route::post('admin/brukere/opprett', [UserController::class, 'store'])->name('user.store');
    Route::get('admin/brukere/rediger/{user}', [UserController::class, 'edit'])->name('user.edit');
    Route::put('admin/brukere/rediger/{user}', [UserController::class, 'update'])->name('user.update');

    Route::get('admin/roller', [AdminController::class, 'roles'])->name('admin.roles');
    Route::get('admin/roller/{role}', [RoleController::class, 'edit'])->name('role.edit');
    Route::put('admin/roller/{role}/{user}', [RoleController::class, 'update'])->name('role.update');
});
