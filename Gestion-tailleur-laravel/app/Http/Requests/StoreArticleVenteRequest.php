<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleVenteRequest extends FormRequest
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
            'libelle' => 'required|string|unique:article_ventes,libelle',
            'promotion' => 'nullable|numeric',
            'ref' => 'required|string',
            'marge' => 'required|numeric',
            'prix_de_vente' => 'required|numeric',
            'cout_fabrication' => 'required|numeric',
            'image' => 'nullable|string',
            'categorie_id' => 'required|exists:categories,id',
        ];
    }
}
