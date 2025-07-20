<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

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
        'project_id'
    ];

    public function projects()
    {
        return $this->belongsTo(Project::class);
    }

    public function scopeSearch(Builder $query, Request $request)
    {
        return $query->when($request->search, function ($query) use ($request) {
                return $query->whereAny(['saksbeh', 'gnr', 'bnr', 'adresse', 'status', 'kommentar'], 'ilike', '%' . $request->search . '%');
            })->when($request->project_id, function ($query) use ($request) {
                if ($request->project_id === 'null') {
                    return $query->whereNull('project_id');
                }
                return $query->where('project_id', $request->project_id);
            });
    }
}