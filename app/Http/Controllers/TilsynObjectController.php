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

    // public function filter(Request $request)
    // {
    //     $query = Tilsyn_object::query();

    //     if ($request->has('status')) {
    //         $query->where('status', $request->input('status'));
    //     }

    //     if ($request->has('type')) {
    //         $query->where('type', $request->input('type'));
    //     }

    //     $tilsynObjects = $query->get();

    //     return Inertia::render('Deadlines/Index', [
    //         'tilsynObjects' => TilsynObjectResource::collection($tilsynObjects),
    //     ]);
    // }
}
