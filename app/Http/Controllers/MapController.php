<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTilsynObjectRequest;
use App\Models\Project;
use App\Models\Tilsyn_object;
use App\Models\User;
use DB;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index(Tilsyn_object $tilsynObject)
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

        return Inertia::render('Map', [
            'tilsynObjectsData' => $tilsynObjectsData[0]->jsonb_build_object,
        ]);
    }

    public function store(StoreTilsynObjectRequest $request)
    {
        // Validate and store the Tilsyn_object
        $tilsynObject = Tilsyn_object::create(
            ['geom' => DB::raw("ST_SetSRID(ST_GeomFromGeoJSON('{\"type\": \"Point\", \"coordinates\": [$request->lng, $request->lat]}'), 4326)"),] + $request->validated()
        );

        return to_route('map')
            ->with('success', 'Tilsynsobjektet ble opprettet.');
    }


    public function update(StoreTilsynObjectRequest $request, Tilsyn_object $tilsynObject)
    {
        // dd($tilsynObject);
        $tilsynObject->update($request->validated());

        return to_route('map')
            ->with('success', 'Tilsynsobjektet ble oppdatert.');
    }

    public function destroy(Tilsyn_object $tilsynObject)
    {
        $tilsynObject->delete();

        return to_route('map')
            ->with('success', 'Tilsynsobjektet ble slettet.');
    }
}
