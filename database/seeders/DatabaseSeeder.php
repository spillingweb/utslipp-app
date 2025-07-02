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
        User::factory()->create([
            'name' => 'Karoline Hildre Spilling',
            'email' => 'khspilling@gmail.com',
        ]);
        
        User::factory(10)->create();

        $this->call([
            ProjectSeeder::class,
            TilsynObjectSeeder::class,
            RoleSeeder::class,
            RoleUserTableSeeder::class,
        ]);
    }
}
