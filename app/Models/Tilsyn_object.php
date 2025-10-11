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
        $query->where('status', '!=', 'O');
        
        return $query->when($request->input('sok'), function ($query) use ($request) {
            return $query->whereAny(['saksbeh', 'gnr', 'bnr', 'adresse', 'status', 'kommentar', 'svarskjema', 'komtek', 'kontroll', 'arkiv', 'hjemmel'], 
            'ilike', '%' . $request->input('sok') . '%');
        })
            ->when($request->input('prosjekt'), function ($query) use ($request) {
                if ($request->input('prosjekt') === 'ingen') {
                    return $query->whereNull('project_id');
                }
                return $query->where('project_id', $request->input('prosjekt'));
            });
    }

    public function scopeFilter(Builder $query, Request $request)
    {
        if (!$request->has('filter')) {
            return $query->where('status', '!=', 'O');
        }

        return $query->when($request->input('filter'), function ($query) use ($request) {
            return match ($request->input('filter')) {
                'alle' => $query,
                'tilsyn' => $query->where('status', '!=', 'O'),
                'frist' => $query->where('status', '!=', 'O')
                                ->where('frist', '<=', now()),
                default => $query->where('status', '!=', 'O'),
            };
        });
    }

    public function scopeProject(Builder $query, Request $request)
    {
        if (!$request->has('prosjekt')) {
            return $query->where('status', '!=', 'O');
        }

        return $query->when($request->input('prosjekt'), function ($query) use ($request) {
           return $query->where('project_id', $request->input('prosjekt'));
        });
    }
}