<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('article_ventes', function (Blueprint $table) {
            $table->id();
            $table->string('libelle')->unique();
            $table->foreignIdFor(\App\Models\Categorie::class)->constrained()->cascadeOnDelete();
            $table->integer('promotion')->nullable();
            $table->string('ref');
            $table->integer('marge');
            $table->integer('prix_de_vente');
            $table->integer('cout_fabrication');
            $table->longText('image')->nullable();
            $table->integer('quantite')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_ventes');
    }
};
