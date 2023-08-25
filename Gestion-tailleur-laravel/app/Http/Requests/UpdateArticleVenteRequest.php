<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArticleVenteRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'libelle' => 'nullable|string',
            'promotion' => 'nullable|numeric',
            'ref' => 'nullable|string',
            'marge' => 'nullable|numeric',
            'prix_de_vente' => 'nullable|numeric',
            'cout_fabrication' => 'nullable|numeric',
            'image' => 'nullable|string',
            'categorie_id' => 'required|exists:categories,id',
        ];
    }
}
