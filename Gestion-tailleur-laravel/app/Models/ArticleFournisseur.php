<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleFournisseur extends Model
{
    use HasFactory;
protected $table = 'article_fournisseurs';
protected $fillable = ['article_id','fournisseur_id'];
}
