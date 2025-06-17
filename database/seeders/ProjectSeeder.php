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
                'number' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Hytteprosjekt',
                'number' => 2,

            ],
            [
                'id' => 3,
                'name' => 'Steinsfjorden',
                'number' => 3,

            ],
            [
                'id' => 4,
                'name' => 'Sentrum',
                'number' => 4,

            ]
        ];

        Project::insert($projects);
    }
}
