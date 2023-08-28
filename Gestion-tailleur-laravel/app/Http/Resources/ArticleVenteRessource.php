<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleVenteRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'libelle' => $this->libelle,
            'promotion' => $this->promotion,
            'ref' => $this->ref,
            'marge' => $this->marge,
            'prix_de_vente' => $this->prix_de_vente,
            'cout_fabrication' => $this->cout_fabrication,
            'quantite' => 0,
            'image' => $this->image,
            'confections' => $this->vente_confection->map(function ($confection) {
                return [
                    'libelle' => $confection->libelle,
                    'quantite' => $confection->pivot->quantite,
                ];
            }),
        ];
    }
}
