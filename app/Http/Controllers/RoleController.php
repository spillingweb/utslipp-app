<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{

    public function index() {
        $roles = Role::all();

        return Inertia::render('Admin', [
            'roles' => RoleResource::collection($roles),
        ]);
    }


}
