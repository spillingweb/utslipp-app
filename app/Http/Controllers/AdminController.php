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
}
