<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categorie extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = ['libelle'];

    public function fournisseurs()
    {
        return $this->hasMany(Fournisseur::class);
    }
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
