<?php

namespace App\Http\Controllers;

use App\Http\Resources\TilsynObjectResource;
use App\Models\Tilsyn_object;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TilsynObjectController extends Controller
{
    public function index()
    {
        $tilsynObjects = Tilsyn_object::all();

        return Inertia::render('Deadlines/Index', [
            'tilsynObjects' => TilsynObjectResource::collection($tilsynObjects),
        ]);
    }

    public function show(Tilsyn_object $tilsynObject)
    {
        $tilsynObjectsData = DB::select("SELECT jsonb_build_object(
                'type',     'FeatureCollection',
                'features', jsonb_agg(features.feature)
            )
            FROM (
            SELECT jsonb_build_object(
                'type',       'Feature',
                'id',         id,
                'geometry',   ST_AsGeoJSON(geom)::jsonb,
                'properties', to_jsonb(inputs) - 'geom'
            ) AS feature
            FROM (SELECT * FROM tilsyn_objects) inputs) features;"
        );
        
        return Inertia::render('Map', ['tilsynObjectsData' => $tilsynObjectsData[0]->jsonb_build_object]);
    }
}
