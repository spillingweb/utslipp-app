<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the Microsoft authentication page.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirect()
    {
        $tenant = env('MICROSOFT_TENANT_ID');

        return Socialite::driver('microsoft')->with(['tenant' => $tenant])->redirect();
    }

    /**
     * Handle the callback from Microsoft.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback()
    {
        $microsoftUser = Socialite::driver('microsoft')->user();

        // Check if the user already exists in your database
        $user = User::where('email', $microsoftUser->getEmail())->first();

        // Redirect to login if email not found in database
        if (!$user) {
            return to_route('login')->withErrors(['email' => 'Email not found in our records.']);
        }

        // Log in the user
        Auth::login($user);

        return to_route('map'); // Redirect to your desired page after login
    }
}
