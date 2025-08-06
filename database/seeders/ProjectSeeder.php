<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'id' => 1,
                'name' => 'Hadelandsveien',
            ],
            [
                'id' => 2,
                'name' => 'Hytteprosjekt',

            ],
            [
                'id' => 3,
                'name' => 'Steinsfjorden',
            ],
            [
                'id' => 4,
                'name' => 'Sentrum',
            ]
        ];

        Project::insert($projects);
    }
}
