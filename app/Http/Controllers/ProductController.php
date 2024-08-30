<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Fetch all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    // Fetch single product by ID
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product, 200);
    }

    // Create a new product
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image
        ]);

        // Handle file upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/pictures');
            $validatedData['image'] = basename($imagePath);
        }

        $product = Product::create($validatedData);

        return response()->json($product, 201);
    }

    // Edit product by ID
    public function edit($product)
    {
        $product = Product::find($product);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        return response()->json($product, 200);
    }
    
    // Update product by ID
    public function edited(Request $request, $product)
{
    $product = Product::find($product);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Validate the incoming request data
     $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Handle file upload
    if ($request->hasFile('image')) {
        // Delete old image
        if ($product->image && Storage::exists('public/pictures/' . $product->image)) {
            Storage::delete('public/pictures/' . $product->image);
        }

        $imagePath = $request->file('image')->store('public/pictures');
        $validatedData['image'] = basename($imagePath);
    }

    $product->update($validatedData);
    return response()->json($product, 200); 
}



    // Delete product by ID
    public function destroy($product)
    {
        $product = Product::find($product);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete image
        if ($product->image && Storage::exists('public/pictures/' . $product->image)) {
            Storage::delete('public/pictures/' . $product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 204);
    }
}
