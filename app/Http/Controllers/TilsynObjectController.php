<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTilsynObjectRequest;
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

        return Inertia::render('TilsynObjects/Index', [
            'tilsynObjects' => TilsynObjectResource::collection($tilsynObjects),
        ]);
    }

    public function edit($id)
    {
        $tilsynObject = Tilsyn_object::findOrFail($id);

        return Inertia::render('TilsynObjects/EditTilsynObject', [
            'tilsynObject' => TilsynObjectResource::make($tilsynObject),
        ]);
    }
    public function update(StoreTilsynObjectRequest $request, Tilsyn_object $tilsynObject)
    {
        $tilsynObject->update($request->validated());

        return redirect()->route('tilsyn_objects')
            ->with('success', 'Tilsynsobjektet ble oppdatert.');
    }

    public function destroy(Tilsyn_object $tilsynObject)
    {
        $tilsynObject->delete();

        return redirect()->route('tilsyn_objects')
            ->with('success', 'Tilsynsobjektet ble slettet.');
    }
}
