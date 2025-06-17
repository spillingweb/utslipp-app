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
        'komtek',
        'kontroll',
        'arkiv',
        'hjemmel',
        'prosjekt'
    ];

    public function projects()
    {
        return $this->belongsTo(Project::class);
    }
}
