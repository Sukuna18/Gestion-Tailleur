<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleVenteRequest;
use App\Http\Requests\UpdateArticleVenteRequest;
use App\Http\Resources\ArticleVenteCollection;
use App\Http\Resources\ArticleVenteRessource;
use App\Models\ArticleVente;
use Illuminate\Support\Facades\DB;

class ArticleVenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $all = ArticleVente::paginate(5);
        return ArticleVenteRessource::collection($all);
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
        $articleVente->update($request->all());
        return new ArticleVenteRessource($articleVente);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArticleVente $articleVente)
    {
        $articleVente->delete();
        return response()->json([
            'message' => 'ArticleVente deleted'
        ], 204);
    }
}
