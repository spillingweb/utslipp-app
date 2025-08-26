<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::find(1)->roles()->attach(1);
        User::find(2)->roles()->attach(2);
        User::find(3)->roles()->attach(3);
        User::find(4)->roles()->attach(2);
        User::find(5)->roles()->attach(1);
        User::find(6)->roles()->attach(3);
        User::find(7)->roles()->attach(2);
        User::find(8)->roles()->attach(2);
        User::find(9)->roles()->attach(3);
        User::find(10)->roles()->attach(2);
        User::find(11)->roles()->attach(3);
    }
}
