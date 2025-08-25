<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function index()
    {
        Gate::authorize('user_access');

        $roles = Role::all();

        return Inertia::render('Admin/Index', [
            'roles' => RoleResource::collection($roles),
        ]);
    }

}
