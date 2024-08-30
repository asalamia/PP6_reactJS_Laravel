<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create a Product</title>
</head>
<body>
    <h1>Create a Product</h1>

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

    <form method="post" action="{{ route('product.store') }}" enctype="multipart/form-data">
        @csrf
        @method('post')

        <!-- Name Input -->
        <div>
            <label for="name">Product Name:</label>
            <input type="text" id="name" name="name" value="{{ old('name') }}" required>
        </div>

        <!-- Description Input -->
        <div>
            <label for="description">Product Description:</label>
            <textarea id="description" name="description" required>{{ old('description') }}</textarea>
        </div>

        <!-- Price Input -->
        <div>
            <label for="price">Product Price:</label>
            <input type="number" id="price" name="price" step="0.01" value="{{ old('price') }}" required>
        </div>

        <!-- Image Input -->
        <div>
            <label for="image">Product Image (Optional):</label>
            <input type="file" id="image" name="image" class="form-control">
        </div>

        <!-- Submit Button -->
        <div>
            <button type="submit">Add Product</button>
        </div>
    </form>
</body>
</html>
