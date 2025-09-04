<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StorePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Password::defaults()],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'Token er påkrevd.',
            'email.required' => 'E-post er påkrevd.',
            'email.email' => 'E-post må være en gyldig e-postadresse.',
            'password.required' => 'Passord er påkrevd.',
            'password.confirmed' => 'Passordene må stemme overens.',
            'password.token' => 'Dette passordet tilbakestillings-tokenet er ugyldig.',
        ];
    }
}
