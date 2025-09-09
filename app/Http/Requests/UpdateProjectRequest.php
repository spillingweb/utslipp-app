<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'id' => ['required', 'integer', Rule::unique('projects')->ignore($this->project->id)],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Navn på prosjektet er påkrevd',
            'name.string' => 'Navn på prosjektet må være en tekst',
            'name.max' => 'Navn på prosjektet kan maks være 255 tegn',
            'id.required' => 'Prosjektnummer er påkrevd',
            'id.integer' => 'Prosjektnummer må være et tall',
            'id.unique' => 'Prosjektnummeret er allerede i bruk',
        ];
    }
}
