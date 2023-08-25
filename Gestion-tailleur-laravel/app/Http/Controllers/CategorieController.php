<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Http\Resources\CategorieRessource;
use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$models = Categorie::withTrashed()->get();
        $category = Categorie::paginate(5);
        return CategorieRessource::collection($category);
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
    public function store(StoreCategorieRequest $request)
    {
        $addCategorie = Categorie::create([
            'libelle' => $request->libelle,
            'type' => $request->type
        ]);
        return response()->json([
            'message' => 'Categorie created',
            'categorie' => new CategorieRessource($addCategorie)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $categorie)
    {
        $getCategorie = Categorie::findOrFail($categorie->id);
        return new CategorieRessource($getCategorie);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categorie $categorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        $editCategorie = Categorie::findOrFail($categorie->id);
        $editCategorie->update([
            'libelle' => $request->libelle,
            'type' => $request->type,
        ]);
        return response()->json([
            'message' => 'Categorie updated',
            'categorie' => new CategorieRessource($editCategorie)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        //   
    }
    public function deleteEach(Request $request)
    {
        $categorieIds = $request->categorieIds;
        Categorie::whereIn('id', $categorieIds)->delete();
        Article::whereIn('categorie_id', $categorieIds)->delete();
        return response()->json([
            'message' => 'Categories deleted'
        ], 200);
    }
    public function search($libelle)
    {
        // $categories = Categorie::where('libelle', 'like', '%' . $libelle . '%')->get();
        $categories = Categorie::where('libelle', $libelle)->first();

        return response()->json([
            'message' => 'Résultats de la recherche',
            'categories' => new CategorieRessource($categories)
        ], 200);
    }
}
