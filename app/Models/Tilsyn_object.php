<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tilsyn_object extends Model
{
    protected $fillable = [
        'geom',
        'gnr',
        'bnr',
        'fnr',
        'adresse',
        'bygning',
        'sone',
        'status',
        'saksnr',
        'kommentar',
        'frist',
        'saksbeh',
        'endret_av',
        'svarskjema',
        'slam',
        'kontroll',
        'arkiv',
        'hjemmel',
        'prosjekt'
    ];
}
