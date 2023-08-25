<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleRessource;
use App\Http\Resources\CategorieRessource;
use App\Http\Resources\FournisseurRessource;
use App\Models\Article;
use App\Models\Categorie;
use App\Models\Fournisseur;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allFournisseur = Fournisseur::all();
        $allCategories = Categorie::where('type', 'confection')->get();
        $allArticles = Article::all();
        return response()->json([
            'fournisseurs' => FournisseurRessource::collection($allFournisseur),
            'categories' => CategorieRessource::collection($allCategories),
            'articles' =>  ArticleRessource::collection($allArticles)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $article = null;
        DB::transaction(function () use ($request, &$article) {
            $article =  Article::create([
                'libelle' => $request->libelle,
                'prix' => $request->prix,
                'stock' => $request->stock,
                'categorie_id' => $request->categorie_id,
                'image' => $request->image,
                'REF' => $request->REF
            ]);
        });
        return new ArticleRessource($article);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleRessource($article);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        DB::transaction(function () use ($request, $article) {
            $article->update([
                'libelle' => $request->libelle,
                'prix' => $request->prix,
                'stock' => $request->stock,
                'categorie_id' => $request->categorie_id,
                'image' => $request->image,
                'REF' => $request->REF
            ]);
            $article->fournisseurs()->sync($request->fournisseurs);  
        });
        return new ArticleRessource($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article supprimé avec succès !']);
    }
}
