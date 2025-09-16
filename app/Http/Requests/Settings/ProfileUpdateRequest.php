<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Vennligst oppgi navn.',
            'name.string' => 'Navn må være en tekst.',
            'name.max' => 'Navn kan ikke være lengre enn 255 tegn.',

            'email.required' => 'Vennligst oppgi e-post.',
            'email.string' => 'E-post må være en tekst.',
            'email.email' => 'E-post må være en gyldig e-postadresse.',
            'email.max' => 'E-post kan ikke være lengre enn 255 tegn.',
            'email.unique' => 'Denne e-posten er allerede i bruk.',
        ];
    }
}
