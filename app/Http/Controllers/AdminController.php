<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function index()
    {
        $roles = Role::all();
        $users = DB::select('SELECT id, name, email, email_verified_at, DATE(created_at) as created_at FROM users ORDER BY id');

        return Inertia::render('Admin/Index', [
            'users' => UserResource::collection($users),
            'roles' => RoleResource::collection($roles),
        ]);
    }

    public function showRole(Role $role)
    {
        $users = User::whereHas('roles', function ($query) use ($role) {
            $query->where('id', $role->id);
        })->get();

        return Inertia::render('Admin/ManageRole', [
            'role' => new RoleResource($role),
            'users' => UserResource::collection($users),
        ]);
    }

     public function updateRole(Request $request, Role $role) {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $role->update($request->only('name', 'description'));

        return redirect()->route('admin.role.show', $role)->with('success', 'Rollen ble oppdatert.');}
}
