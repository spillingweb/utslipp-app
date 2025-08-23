<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ProjectSeeder::class,
            TilsynObjectSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            RoleUserTableSeeder::class,
            PermissionRoleTableSeeder::class,
        ]);
    }
}
