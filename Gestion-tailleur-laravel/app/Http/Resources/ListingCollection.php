<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ListingCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'categorie' => $this->collection->first()->category,
            'fournisseur' => $this->collection->first()->fournisseurs,
            'article' => $this->collection->first()->articles,
        ];
    }
}
