<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTilsynObjectRequest;
use App\Http\Resources\TilsynObjectResource;
use App\Models\Tilsyn_object;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TilsynObjectController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('tilsyn_object_show');

        $orderColumn = request('sort_kolonne', 'frist'); // Default sort column
        $orderDirection = request('sort_retning', 'asc'); // Default sort direction

        // Validate the requested column and direction to prevent SQL injection
        if (!in_array($orderColumn, ['frist', 'saksbeh', 'project_id', 'sone', 'gnr', 'bnr', 'adresse', 'status', 'kommentar', 'svarskjema', 'komtek', 'kontroll', 'arkiv', 'hjemmel'])) {
            $orderColumn = 'frist';
        }
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'asc';
        }

        $tilsynObjects = Tilsyn_object::search($request)
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(15);

        return Inertia::render('TilsynObjects/Index', [
            'tilsynObjects' => TilsynObjectResource::collection($tilsynObjects),
            'project_id' => $request->prosjekt ?? '',
            'search' => $request->sok ?? '',
        ]);
    }

    public function edit($id)
    {
        Gate::authorize('tilsyn_object_edit');

        $tilsynObject = Tilsyn_object::findOrFail($id);

        return Inertia::render('TilsynObjects/EditTilsynObject', [
            'tilsynObject' => TilsynObjectResource::make($tilsynObject),
        ]);
    }
    public function update(StoreTilsynObjectRequest $request, Tilsyn_object $tilsynObject)
    {
        Gate::authorize('tilsyn_object_edit');

        $tilsynObject->update($request->validated());

        return redirect()->route('tilsyn_objects')
            ->with('success', 'Tilsynsobjektet ble oppdatert.');
    }

    public function destroy(Tilsyn_object $tilsynObject)
    {
        Gate::authorize('tilsyn_object_edit');

        $tilsynObject->delete();

        return redirect()->route('tilsyn_objects')
            ->with('success', 'Tilsynsobjektet ble slettet.');
    }
}
