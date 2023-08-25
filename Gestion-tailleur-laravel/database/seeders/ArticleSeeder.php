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
                'categorie_id' => 1,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-TIS-GET-1',
                'libelle' => 'tissu',
            ],
            [
                'id' => 2,
                'categorie_id' => 2,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-FIL-COT-1',
                'libelle' => 'fil',
            ],
            [
                'id' => 3,
                'categorie_id' => 7,
                'prix' => 1000,
                'stock' => 100,
                'REF' => 'REF-BOU-PLA-1',
                'libelle' => 'bouton',
            ],
            
        ];
        \App\Models\Article::insert($categories);
    }
}
