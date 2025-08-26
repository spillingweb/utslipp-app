<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function edit(Role $role)
    {
        Gate::authorize('user_access');

        // Fetch users associated with the role
        $roleUsers = User::whereHas('roles', fn($query) => $query->where('roles.id', $role->id))->get();
        $otherUsers = User::whereDoesntHave('roles', fn($query) => $query->where('roles.id', $role->id))->get();

        return Inertia::render('Admin/ManageRole', [
            'role' => RoleResource::make($role),
            'roleUsers' => UserResource::collection($roleUsers),
            'otherUsers' => UserResource::collection($otherUsers),
        ]);
    }

    public function update(Request $request, Role $role, User $user)
    {
        Gate::authorize('user_access');

        // Make sure you don't give yourself a different role
        if ($user->id === auth()->id()) {
            return redirect()->route('role.edit', $role)->with('error', 'Du kan ikke gi deg selv en annen rolle.');
        }

        // Remove previous assignments to other roles
        $user->roles()->detach();

        // Attach the user to the role
        $role->users()->attach($user->id);

        return redirect()->route('role.edit', $role)->with('success', 'Brukeren ble lagt til i rollen ' . $role->name . '.');
    }
}