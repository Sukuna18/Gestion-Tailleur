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
            'image' => $this->image,
            'quantite' => $this->vente_confection->sum('quantite'),
            'confections' => $this->vente_confection->map(function ($confection) {
                return [
                    $confection->libelle
                ];
            }),
        ];
    }
}
