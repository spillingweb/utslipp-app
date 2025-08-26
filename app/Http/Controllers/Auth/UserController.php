<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        Gate::authorize('user_access');

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
    public function store(StoreUserRequest $request): RedirectResponse
    {
        Gate::authorize('user_access');

        // Create user after validation by rules in StoreUserRequest
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Attach role to user
        $user->roles()->attach($request->role);

        event(new Registered($user));

        return to_route('admin.users')
            ->with('success', 'Brukeren ble opprettet.');
    }

    public function edit(User $user): Response
    {
        Gate::authorize('user_access');

        $roles = Role::all();

        return Inertia::render('Admin/EditUser', [
            'user' => UserResource::make($user),
            'roles' => RoleResource::collection($roles)
        ]);
    }

    public function update(UserUpdateRequest $request, User $user): RedirectResponse
    {
        Gate::authorize('user_access');

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return to_route('admin.users')
            ->with('success', 'Brukeren ble oppdatert.');
    }

    public function destroy(User $user): RedirectResponse
    {
        Gate::authorize('user_access');

        if (Auth::user()->id === $user->id) {
            return to_route('admin.users')
                ->with('error', 'Du kan ikke slette deg selv.');
        }

        $user->delete();

        return to_route('admin.users')
            ->with('success', 'Brukeren ble slettet.');
    }
}
