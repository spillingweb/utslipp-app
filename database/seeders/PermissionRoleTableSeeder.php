<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminPermissions = Permission::all();
        $editPermissions = Permission::whereIn('name', [
            'tilsyn_object_show',
            'tilsyn_object_edit',
            'project_show',
            'project_edit',
        ])->get();
        $viewPermissions = Permission::whereIn('name', [
            'tilsyn_object_show',
            'project_show',
        ])->get();

        Role::find(1)->permissions()->attach($adminPermissions);
        Role::find(2)->permissions()->attach($editPermissions);
        Role::find(3)->permissions()->attach($viewPermissions);
    }
}
