<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\TilsynObjectResource;
use App\Models\Project;
use App\Models\Tilsyn_object;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        Gate::authorize('project_show');

        $projects = Project::with('tilsyn_objects')->orderBy('id', 'DESC')->get();
        $noProjects = Tilsyn_object::where('project_id', null)->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'noProjects' => $noProjects
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        Gate::authorize('project_edit');

        Project::create($request->validated());

        return to_route('projects')
            ->with('success', 'Prosjektet ble opprettet.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        Gate::authorize('project_edit');

        $project->delete();

        Tilsyn_object::where('project_id', $project->id)->update(['project_id' => null]);

        return to_route('projects')
            ->with('success', 'Prosjektet ble slettet.');
    }
}
