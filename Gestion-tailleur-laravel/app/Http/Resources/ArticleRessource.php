<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'libelle' => $this->libelle,
            'prix' => $this->prix,
            'stock' => $this->stock,
            'categorie' => $this->categorie->libelle,
            'categorie_id' => $this->categorie->id,
            'count' => $this->categorie->count,
            'image' => $this->image,
            'REF' => $this->REF,
        ];
        $data['fournisseurs_name'] = FournisseurRessource::collection($this->fournisseurs);
        return $data;
    }
    public function with($request)
    {
        return[
            "message" => $request->message,
            "sucess" => true
        ];
    }
}
