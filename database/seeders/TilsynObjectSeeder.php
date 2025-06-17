<?php

namespace Database\Seeders;

use App\Models\Tilsyn_object;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TilsynObjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tilsyn_objects = [
            [
                'id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
                'geom' => '0101000020E6100000010000E0E6BA2440B9943AFE9D194E40',
                'gnr' => '113',
                'bnr' => '1',
                'adresse' => 'Hadelandsveien 690',
                'bygning' => 'B',
                'sone' => 4,
                'status' => 'T',
                'endret_av' => 'Karoline',
                'project_id' => 1,
                'saksbeh' => 'Karoline',
                'frist' => now()->addDays(30),
            ],
            [
                'id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
                'geom' => '0101000020E6100000C3176C1897B82440EDBBD7BBCA174E40',
                'gnr' => '109',
                'bnr' => '10',
                'adresse' => 'Hadelandsveien 583',
                'bygning' => 'B',
                'sone' => 4,
                'status' => 'T',
                'endret_av' => 'Karoline',
                'project_id' => 1,
                'saksbeh' => 'Karoline',
                'frist' => now()->addDays(30)
            ],
            [
                'id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
                'geom' => '0101000020E6100000010000C0F7BA24402E522D78F9184E40',
                'gnr' => '111',
                'bnr' => '27',
                'adresse' => 'Vesetrudgata 2',
                'bygning' => 'B',
                'sone' => 4,
                'status' => 'T',
                'endret_av' => 'Karoline',
                'project_id' => 1,
                'saksbeh' => 'Karoline',
                'frist' => now()->addDays(30)
            ],
            [
                'id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
                'geom' => '0101000020E6100000000000B869BA2440C38DEF1437194E40',
                'gnr' => '112',
                'bnr' => '1',
                'adresse' => 'Hadelandsveien 666',
                'bygning' => 'B',
                'sone' => 4,
                'status' => 'B',
                'endret_av' => 'Karoline',
                'project_id' => 1,
                'saksbeh' => 'Karoline',
                'frist' => now()->addDays(30)
            ],
            [
                'id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
                'geom' => '0101000020E6100000010000A0C3D22440FC6E009D38134E40',
                'gnr' => '101',
                'bnr' => '4',
                'adresse' => 'Borgerseterveien 168',
                'bygning' => 'H',
                'sone' => 1,
                'status' => 'F',
                'endret_av' => 'Karoline',
                'project_id' => 2,
                'saksbeh' => 'Karoline',
                'frist' => now()->addDays(30)
            ],
            [
                'id' => 6,
                'created_at' => now(),
                'updated_at' => now(),
                'geom' => '0101000020E61000000100001C6C9F24404EE18E6146154E40',
                'gnr' => '100',
                'bnr' => '2',
                'adresse' => 'Klekkenveien 152',
                'bygning' => 'B',
                'sone' => 4,
                'status' => 'T',
                'endret_av' => 'Karoline',
                'project_id' => 3,
                'saksbeh' => 'Karoline',
                'frist' => now()->addDays(30)
            ],
            [
                'id' => 7,
                'created_at' => now(),
                'updated_at' => now(),
                'geom' => '0101000020E6100000010000A8B08324400C5A9FBA02164E40',
                'gnr' => '317',
                'bnr' => '245',
                'adresse' => 'Ankersgate 5',
                'bygning' => 'B',
                'sone' => 5,
                'status' => 'T',
                'endret_av' => 'Karoline',
                'project_id' => 4,
                'saksbeh' => 'Karoline',
                'frist' => now()->addDays(30)
            ]
        ];

        Tilsyn_object::insert($tilsyn_objects);
    }
}
