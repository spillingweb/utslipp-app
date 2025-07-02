<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
                Rule::unique(User::class)->ignore($this->user->id),
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Vennligst oppgi et navn.',
            'email.required' => 'Vennligst oppgi en e-postadresse.',
            'email.email' => 'E-post må være en gyldig e-postadresse.',
            'email.unique' => 'E-postadressen er allerede i bruk.',
            'email.lowercase' => 'E-post må være i små bokstaver.',
        ];
    }
}
