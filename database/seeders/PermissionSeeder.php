<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                'name' => 'user_access',
            ],
            [
                'name' => 'tilsyn_object_show',
            ],
            [
                'name' => 'tilsyn_object_edit',
            ],
            [
                'name' => 'project_show',
            ],
            [
                'name' => 'project_edit',
            ],
        ];

        Permission::insert($permissions);
    }
}
