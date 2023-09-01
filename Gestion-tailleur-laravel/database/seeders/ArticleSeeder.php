<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'categorie_id' => 3,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-TISS-FIL-1',
                'libelle' => 'fil en coton',
            ],
            [
                'id' => 2,
                'categorie_id' => 2,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-TISS-SOI-1',
                'libelle' => 'soie',
            ],
            [
                'id' => 3,
                'categorie_id' => 3,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-FIL-FIL-1',
                'libelle' => 'fil en polyester',
            ],
            [
                'id' => 4,
                'categorie_id' => 2,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-TISS-BAS-1',
                'libelle' => 'basin',
            ],
            [
                'id' => 5,
                'categorie_id' => 2,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-TISS-BRO-1',
                'libelle' => 'broderie',
            ],
            [
                'id' => 6,
                'categorie_id' => 1,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-BOUT-FIL-1',
                'libelle' => 'bouton en plastique',
            ]
            
        ];
        \App\Models\Article::insert($categories);
    }
}
