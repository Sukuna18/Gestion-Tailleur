<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArticleRequest extends FormRequest
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
            'libelle' => 'nullable|string|max:255|min:3|unique:articles,libelle,' . $this->article->id,
            'prix' => 'numeric|nullable',
            'stock' => 'nullable|numeric',
            'categorie_id' => 'nullable|numeric|exists:categories,id',
            'image' => 'nullable|string',
        ];
    }
}
