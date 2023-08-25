<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ArticleVenteCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => ArticleRessource::collection($this->collection),
            'links' => $this->paginationInformation($this->resource),
        ];
    }
    public function paginationInformation($paginated)
    {
        $links = [];
        $links[] = $paginated['links'];
        return $links;
    }
}
