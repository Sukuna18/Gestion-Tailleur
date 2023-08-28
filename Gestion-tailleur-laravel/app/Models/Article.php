<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'articles';
    protected $fillable = ['libelle', 'prix', 'stock', 'categorie_id', 'image', 'REF'];
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function fournisseurs()
    {
        return $this->belongsToMany(Fournisseur::class, 'article_fournisseurs', 'article_id', 'fournisseur_id');
    }
    public function vente_confection()
    {
        return $this->belongsToMany(ArticleVente::class, 'vente_confections', 'article_id', 'article_vente_id');
    }
    protected static function booted()
    {
        static::created(function ($article) {
            $article->fournisseurs()->attach(request()->fournisseurs);
            Categorie::where('id', $article->categorie_id)->increment('count');
        });
        static::updating(function ($article) {
            
          
        });
    }
}
