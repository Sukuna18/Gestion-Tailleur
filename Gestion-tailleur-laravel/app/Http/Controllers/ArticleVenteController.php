<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleVenteRequest;
use App\Http\Requests\UpdateArticleVenteRequest;
use App\Http\Resources\ArticleRessource;
use App\Http\Resources\ArticleVenteRessource;
use App\Http\Resources\CategorieRessource;
use App\Models\Article;
use App\Models\ArticleVente;
use App\Models\Categorie;
use Illuminate\Support\Facades\DB;

class ArticleVenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $all = ArticleVente::all();
        $categorieVente = Categorie::where('type', 'vente')->get();
        $confection = Article::all();
        return response()->json([
            'articles' => ArticleVenteRessource::collection($all),
            'categories' => CategorieRessource::collection($categorieVente),
            'confection' => ArticleRessource::collection($confection)
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
    public function store(StoreArticleVenteRequest $request)
    {
        $articleVente = null;
        DB::transaction(function() use($request, &$articleVente){
            $articleVente = ArticleVente::create($request->all()); 
        });
        
        return new ArticleVenteRessource($articleVente);
    }

    /**
     * Display the specified resource.
     */
    public function show(ArticleVente $articleVente)
    {
        $articleVente = ArticleVente::findOrFail($articleVente->id);
        return new ArticleVenteRessource($articleVente);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ArticleVente $articleVente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleVenteRequest $request, ArticleVente $articleVente)
    {
        DB::transaction(function() use($request, $articleVente){
            $articleVente->update([
                'libelle' => $request->libelle,
                'categorie_id' => $request->categorie_id,
                'promotion' => $request->promotion,
                'ref' => $request->ref,
                'marge' => $request->marge,
                'prix_de_vente' => $request->prix_de_vente,
                'cout_fabrication' => $request->cout_fabrication,
                'image' => $request->image,
            ]);
            $articleVente->vente_confection()->sync($request->article);

        });

        return new ArticleVenteRessource($articleVente);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArticleVente $articleVente)
    {
        $articleVente->delete();
        return response()->json([
            'message' => 'ArticleVente supprime avec succes'
        ]);
    }
}
