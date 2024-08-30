<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit a Product</title>
</head>
<body>
    <h1>Edit a Product</h1>

    <!-- Display success or error message -->
    @if(session('success'))
        <div style="color: green;">
            {{ session('success') }}
        </div>
    @elseif(session('error'))
        <div style="color: red;">
            {{ session('error') }}
        </div>
    @endif

    <!-- Assuming $product is passed to this view -->
    <form method="post" action="{{ route('product.update', $product->id) }}" enctype="multipart/form-data">
        @csrf
        @method('put')

        <!-- Name Input -->
        <div>
            <label for="name">Product Name:</label>
            <input type="text" id="name" name="name" placeholder="Name" value="{{ old('name', $product->name) }}" required>
        </div>

        <!-- Description Input -->
        <div>
            <label for="description">Product Description:</label>
            <textarea id="description" name="description" placeholder="Description" required>{{ old('description', $product->description) }}</textarea>
        </div>

        <!-- Price Input -->
        <div>
            <label for="price">Product Price:</label>
            <input type="number" id="price" name="price" step="0.01" placeholder="Price" value="{{ old('price', $product->price) }}" required>
        </div>

        <!-- Image Input -->
        <div>
            <label for="image">Product Image (Optional):</label>
            <input type="file" id="image" name="image" accept="image/*">
            @if($product->image_path)
                <div>
                    <img src="{{ asset('storage/app/public/products' . $product->image_path) }}" alt="Product Image" style="max-width: 150px;">
                </div>
            @endif
        </div>

        <!-- Submit Button -->
        <div>
            <button type="submit">Update Product</button>
        </div>
    </form>
</body>
</html>
