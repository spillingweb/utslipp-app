<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(4)->state(
            new Sequence(
                [
                    'name' => 'Karoline Hildre Spilling',
                    'email' => 'khspilling@gmail.com',
                ],
                [
                    'name' => 'Aleksander Fimreite',
                    'email' => 'aleksander.fimreite@ringerike.kommune.no',
                ],
                [
                    'name' => 'Aleksander Andestad Elstad',
                    'email' => 'aleksander.andestad.elstad@ringerike.kommune.no',
                ],
                [
                    'name' => 'Marit Cecilie Kvitberg',
                    'email' => 'marit.cecilie.kvitberg@ringerike.kommune.no',
                ]
            )
        )->create();
    }
}
