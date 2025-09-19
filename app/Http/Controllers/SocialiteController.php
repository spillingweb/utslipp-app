<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the Azure authentication page.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirect()
    {
        return Socialite::driver('azure')->redirect();
    }

    /**
     * Handle the callback from Azure.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback()
    {
        $azureUser = Socialite::driver('azure')->user();

        // Check if the user already exists in your database
        $user = User::where('email', $azureUser->getEmail())->first();

        // Redirect to login if email not found in database
        if (!$user) {
            return to_route('login')
                    ->with('error', 'Vi kunne ikke finne din e-post i systemet. Vennligst kontakt administrator.');
        }

        // Log in the user
        Auth::login($user);

        return to_route('map'); // Redirect to your desired page after login
    }
}
