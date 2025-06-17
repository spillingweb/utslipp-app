<?php

namespace App\Http\Controllers;

use App\Http\Resources\TilsynObjectResource;
use App\Models\Project;
use App\Models\Tilsyn_object;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        // $tilsynObjects = Tilsyn_object::all();
        // $projects = Project::all();

        // return Inertia::render('Projects', [
        //     'tilsynObjects' => TilsynObjectResource::collection($tilsynObjects),
        //     'projects' => $projects,
        // ]);´

        $projects = Project::with('tilsyn_objects')->get();

        return Inertia::render('Projects', [
            'projects' => $projects
        ]);
    }
}
