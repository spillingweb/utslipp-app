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
                'description' => 'Rolle som tillater administrering av brukere og tilgangsgrupper',
            ],
            [
                'id' => 2,
                'name' => Role::ROLES['Edit'],
                'description' => 'Rolle som tillater redigering av datasettet i utslippsdatabasen',

            ],
            [
                'id' => 3,
                'name' => Role::ROLES['View'],
                'description' => 'Rolle som tillater innsyn og søk i datasettet til utslippsdatabasen',

            ]
        ];

        Role::insert($roles);
    }
}