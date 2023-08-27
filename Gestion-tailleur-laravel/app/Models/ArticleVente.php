<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArticleVente extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'article_ventes';
    protected $fillable = [
        'libelle',
        'categorie_id',
        'promotion',
        'ref',
        'marge',
        'prix_de_vente',
        'cout_fabrication',
        'image',
    ];
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function vente_confection(){
        return $this->belongsToMany(VenteConfection::class, 'vente_confections', 'article_vente_id', 'article_id');
    }
    protected static function booted()
    {
        static::created(function ($article) {
            $article->vente_confection()->attach(request()->article_id);
        });
    }
}
