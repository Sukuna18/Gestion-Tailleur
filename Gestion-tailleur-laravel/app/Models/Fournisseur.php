<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;
    protected $table = 'fournisseurs';
    protected $fillable = ['nom', 'adresse', 'telephone'];
    public function categories()
    {
        return $this->hasMany(Categorie::class);
    }
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_fournisseurs', 'fournisseur_id', 'article_id');
    }
}
