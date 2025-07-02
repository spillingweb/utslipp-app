<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'id' => 1,
                'name' => Role::ROLES['Admin'],
                'description' => 'Redigering av tilsynsobjekter og administrering av brukere og roller',
            ],
            [
                'id' => 2,
                'name' => Role::ROLES['Edit'],
                'description' => 'Redigering av tilsynsobjekter',

            ],
            [
                'id' => 3,
                'name' => Role::ROLES['View'],
                'description' => 'Innsyn og søk i tilsynsobjekter',

            ]
        ];

        Role::insert($roles);
    }
}