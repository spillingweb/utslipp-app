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
                'id' => -1,
                'name' => 'Åsa 2011',
            ],
           [
                'id' => 1,
                'name' => 'Strømsoddbygda 2013',
            ],
            [
                'id' => 2,
                'name' => 'Strømsoddbygda nord',
            ],
            [
                'id' => 3,
                'name' => 'Strømsoddbygda sør',
            ],
            [
                'id' => 4,
                'name' => 'Sogna Nedre etappe 1',
            ],
            [
                'id' => 5,
                'name' => 'Sogna Nedre etappe 2',
            ],
            [
                'id' => 6,
                'name' => 'Tyristrand/Nakkerud',
            ],
            [
                'id' => 7,
                'name' => 'Klekken etappe 1',
            ],
            [
                'id' => 8,
                'name' => 'Nes etappe 1',
            ],
            [
                'id' => 9,
                'name' => 'Åsa Vest',
            ],
            [
                'id' => 10,
                'name' => 'Sogna Nedre etappe 3',
            ],
            [
                'id' => 11,
                'name' => 'Nes etappe 2',
            ],
            [
                'id' => 12,
                'name' => 'Åsa Øst og Vaker',
            ],
            [
                'id' => 13,
                'name' => 'Minirenseanlegg Åsa',
            ],
            [
                'id' => 14,
                'name' => 'Sogna Nedre etappe 4',
            ],
            [
                'id' => 15,
                'name' => 'Stubbdal + hyttefelt',
            ],
            [
                'id' => 16,
                'name' => 'Loeshagen',
            ],
            [
                'id' => 17,
                'name' => 'Klekken etappe 2',
            ],
            [
                'id' => 18,
                'name' => 'Abrahamrud hyttefelt',
            ],
            [
                'id' => 19,
                'name' => 'Marka-tilsyn',
            ],
            [
                'id' => 20,
                'name' => 'Sogna øvre',
            ],
            [
                'id' => 21,
                'name' => 'Skraperud',
            ],
            [
                'id' => 22,
                'name' => 'Borglund',
            ],
            [
                'id' => 23,
                'name' => 'Vestbygda etappe 1',
            ],
            [
                'id' => 24,
                'name' => 'Vestbygda etappe 2',
            ],
            [
                'id' => 25,
                'name' => 'Heggeliveien',
            ],
            [
                'id' => 26,
                'name' => 'Flaskerudsetra omegn',
            ],
            [
                'id' => 27,
                'name' => 'Solum og Stigsrud',
            ],
            [
                'id' => 28,
                'name' => 'Vestre Ådal',
            ],
            [
                'id' => 29,
                'name' => 'Ådal Øst',
            ],
            [
                'id' => 30,
                'name' => 'Ad-hoc',
            ],
            [
                'id' => 31,
                'name' => 'Sperillen øst',
            ],
            [
                'id' => 32,
                'name' => 'Tyristrand',
            ],
            [   
                'id' => 33,
                'name' => 'Nes i Ådal',
            ],
            [
                'id' => 34,
                'name' => 'Hadelandsveien',
            ],
            [
                'id' => 35,
                'name' => 'Nakkerud',
            ],
            [
                'id' => 36,
                'name' => 'Mulig ikke omsøkt',
            ],
            [
                'id' => 37,
                'name' => 'Akutt forurensing',
            ],
            [
                'id' => 38,
                'name' => 'Samsjøen',
            ],
            [
                'id' => 39,
                'name' => 'Hallingby-Hen',
            ],
            [
                'id' => 40,
                'name' => 'Stasjonsveien',
            ],
            [
                'id' => 41,
                'name' => 'Snadden',
            ],
            [
                'id' => 99,
                'name' => 'Ad hoc',
            ],
            [
                'id' => 100,
                'name' => 'Mulig randsone',
            ],
            [
                'id' => 101,
                'name' => 'Off. slamavskillere',
            ],
            [
                'id' => 102,
                'name' => 'Buffersone',
           ]
        ];

        Project::insert($projects);
    }
}