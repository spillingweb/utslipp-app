<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTilsynObjectRequest extends FormRequest
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
            'status' => 'required|string|max:10',
            'sone' => 'required|integer',
            'gnr' => 'required|integer',
            'bnr' => 'required|integer',
            'fnr' => 'nullable|integer',
            'adresse' => 'nullable|string|max:100',
            'bygning' => 'nullable|string|max:20',
            'saksnr' => 'nullable|string|max:20',
            'kommentar' => 'nullable|string',
            'frist' => 'nullable|date',
            'saksbeh' => 'nullable|string|max:50',
            'endret_av' => 'nullable|string|max:50',
            'svarskjema' => 'nullable|string',
            'slam' => 'nullable|string',
            'kontroll' => 'nullable|string',
            'arkiv' => 'nullable|string',
            'hjemmel' => 'nullable|string|max:50',
            'project_id' => 'nullable|exists:projects,id',
        ];
    }
}
