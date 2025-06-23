<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $roles = Role::all();

        return Inertia::render('Admin/CreateUser', [
            'roles' => RoleResource::collection($roles),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return to_route('admin')
            ->with('success', 'Brukeren ble opprettet.');
    }

    public function edit(User $user): Response
    {
        $roles = Role::all();

        return Inertia::render('Admin/EditUser', [
            'user' => UserResource::make($user),
            'roles' => RoleResource::collection($roles)
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
        ]);

        $user = User::findOrFail($id);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return to_route('admin')
            ->with('success', 'Brukeren ble oppdatert.');
    }

    public function destroy(User $user): RedirectResponse
    {
        if (Auth::user()->id === $user->id) {
            return to_route('admin')
                ->with('error', 'Du kan ikke slette deg selv.');
        }

        $user->delete();

        return to_route('admin')
            ->with('success', 'Brukeren ble slettet.');
    }
}
