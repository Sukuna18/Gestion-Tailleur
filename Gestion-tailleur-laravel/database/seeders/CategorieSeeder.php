<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $categories = [
            [
                'id' => 1,
                'type' => 'confection',
                'libelle' => 'bouton',
            ],
            [
                'id' => 2,
                'type' => 'confection',
                'libelle' => 'tissu',
            ],
            [
                'id' => 3,
                'type' => 'confection',
                'libelle' => 'fil',
            ],
            [
                'id' => 4,
                'type' => 'vente',
                'libelle' => 'costume',
            ],
            [
                'id' => 5,
                'type' => 'vente',
                'libelle' => 'robe',
            ],
            [
                'id' => 6,
                'type' => 'vente',
                'libelle' => 'chemise xxl',
            ],     
        ];
        \App\Models\Categorie::insert($categories);
    }
}
