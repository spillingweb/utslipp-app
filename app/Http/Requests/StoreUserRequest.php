<?php

namespace App\Http\Requests;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'lowercase',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => ['required', Password::min(8), 'confirmed'],
            'password_confirmation' => ['required'],
            'role' => ['required', Rule::exists(Role::class, 'id')],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Vennligst oppgi et navn.',
            'email.required' => 'Vennligst oppgi en e-postadresse.',
            'email.email' => 'E-post må være en gyldig e-postadresse.',
            'email.unique' => 'E-postadressen er allerede i bruk.',
            'email.lowercase' => 'E-post må være i små bokstaver.',
            'password.required' => 'Vennligst oppgi et passord.',
            'password.min' => 'Passordet må være minst :min tegn langt.',
            'password.confirmed' => 'Passordene må stemme overens.',
            'password_confirmation.required' => 'Vennligst bekreft passordet.',
            'role.required' => 'Vennligst velg en rolle.',
            'role.exists' => 'Den valgte rollen finnes ikke.',
        ];
    }
}
