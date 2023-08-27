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
        Schema::create('vente_confections', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\ArticleVente::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\Article::class)->constrained()->cascadeOnDelete();
            $table->integer('quantite')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vente_confections');
    }
};
