<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\TilsynObjectResource;
use App\Models\Project;
use App\Models\Tilsyn_object;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('tilsyn_objects')->orderBy('number', 'DESC')->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        Project::create($request->validated());

        return to_route('projects')
            ->with('message', 'Prosjektet ble opprettet.');
    }
}
