<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::redirect('admin', 'admin/brukere');
    Route::get('admin/brukere', [AdminController::class, 'index'])->name('admin.users');
    Route::delete('admin/brukere/slett/{user}', [UserController::class, 'destroy'])->name('admin.user.destroy');

    Route::get('admin/brukere/opprett', [UserController::class, 'create'])->name('admin.user.create');
    Route::post('admin/brukere/opprett', [UserController::class, 'store'])->name('admin.user.store');
    Route::get('admin/brukere/rediger/{user}', [UserController::class, 'edit'])->name('admin.user.edit');
    Route::put('admin/brukere/rediger/{user}', [UserController::class, 'update'])->name('admin.user.update');

    Route::get('admin/roller', [AdminController::class, 'roles'])->name('admin.roles');
    Route::get('admin/roller/{role}', [RoleController::class, 'edit'])->name('admin.role.edit');
    Route::put('admin/roller/{role}/{user}', [RoleController::class, 'update'])->name('admin.role.update');
});
