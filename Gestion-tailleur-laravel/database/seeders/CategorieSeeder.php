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
                'libelle' => 'getzner',
            ],
            [
                'id' => 2,
                'type' => 'confection',
                'libelle' => 'fil en coton',
            ],
            [
                'id' => 3,
                'type' => 'confection',
                'libelle' => 'fil en polyester',
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
            [
                'id' => 7,
                'type' => 'confection',
                'libelle' => 'plastique',
            ],
            [
                'id' => 8,
                'type' => 'confection',
                'libelle' => 'basin',
            ],
            [
                'id' => 9,
                'type' => 'confection',
                'libelle' => 'broderie',
            ],
            [
                'id' => 10,
                'type' => 'confection',
                'libelle' => 'fermeture',
            ],
            
        ];
        \App\Models\Categorie::insert($categories);
    }
}
