<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VenteConfection extends Model
{
    use HasFactory;
    protected $table = 'vente_confections';
    public function article(){
        return $this->belongsTo(Article::class);
    }
    public function vente(){
        return $this->belongsTo(Vente::class);
    }
}
