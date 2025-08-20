<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTilsynObjectRequest;
use App\Models\Project;
use App\Models\Tilsyn_object;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index(Request $request)
    {
        $tilsynObjects = Tilsyn_object::filter($request)->get();

        $features = $tilsynObjects->map(function ($item) {
            $geometry = DB::select("SELECT ST_AsGeoJSON(?) AS geojson", [$item->geom])[0]->geojson;
            $properties = $item->toArray();
            unset($properties['geom']);

            return [
                'type' => 'Feature',
                'geometry' => json_decode($geometry),
                'properties' => $properties,
            ];
        });

        return Inertia::render('Map', [
            'tilsynObjectsData' => [
                'type' => 'FeatureCollection',
                'features' => $features,
            ],
        ]);
    }

    public function filter(Request $request)
    {
        $filterField1 = $request->input('filterField1');
        $filterRelOp1 = $request->input('filterRelOp1');
        $filterValue1 = $request->input('filterValue1');
        $filterField2 = $request->input('filterField2');
        $filterRelOp2 = $request->input('filterRelOp2');
        $filterValue2 = $request->input('filterValue2');
        $logicalOperator = $request->input('logicalOp');

        $filteredTilsynObjects = Tilsyn_object::where('status', '!=', 'O')
            ->where(function ($query) use ($filterField1, $filterRelOp1, $filterValue1, $logicalOperator, $filterField2, $filterRelOp2, $filterValue2) {
                $query->where($filterField1, $filterRelOp1, $filterValue1);

                if ($logicalOperator && $filterField2 && $filterValue2) {
                    if ($logicalOperator === 'AND') {
                        $query->where($filterField2, $filterRelOp2, $filterValue2);
                    } elseif ($logicalOperator === 'OR') {
                        $query->orWhere($filterField2, $filterRelOp2, $filterValue2);
                    } elseif ($logicalOperator === 'AND NOT') {
                        $query->whereNot($filterField2, $filterRelOp2, $filterValue2);
                    }
                }
            })->get();

        $features = $filteredTilsynObjects->map(function ($item) {
            $geometry = DB::select("SELECT ST_AsGeoJSON(?) AS geojson", [$item->geom])[0]->geojson;
            $properties = $item->toArray();
            unset($properties['geom']);

            return [
                'type' => 'Feature',
                'geometry' => json_decode($geometry),
                'properties' => $properties,
            ];
        });

        return Inertia::render('Map', [
            'tilsynObjectsData' => [
                'type' => 'FeatureCollection',
                'features' => $features,
            ],
        ]);
    }

    public function store(StoreTilsynObjectRequest $request)
    {
        $tilsynObject = Tilsyn_object::create(
            ['geom' => DB::raw("ST_SetSRID(ST_GeomFromGeoJSON('{\"type\": \"Point\", \"coordinates\": [$request->lng, $request->lat]}'), 4326)"),]
            + $request->validated()
        );

        return to_route('map')
            ->with('success', 'Tilsynsobjektet ble opprettet.');
    }


    public function update(StoreTilsynObjectRequest $request, Tilsyn_object $tilsynObject)
    {
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

    // public function filterByProject(Project $project)
    // {
    //     $tilsynObjects = Tilsyn_object::where('project_id', $project->id)->get();

    //     return Inertia::render('Map', [
    //         'tilsynObjectsData' => $tilsynObjects,
    //     ]);
    // }
}
