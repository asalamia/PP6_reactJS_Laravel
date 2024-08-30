<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product List</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        img {
            max-width: 150px;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>Product List</h1>
    
    <div>
        <div>
            <a href="{{route('product.create')}}">Create a Product</a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>

           
                <!-- Assuming you are passing a 'products' variable to the view -->
                @foreach($products as $product)
                    <tr>
                        <td>{{ $product->name }}</td>
                        <td>{{ $product->description }}</td>
                        <td>{{ number_format($product->price, 2) }}</td>
                        <td>
                        @if($product->image)
                            <div>
                                <img src="{{ asset($product->image) }}" alt="{{ $product->name }}" style="max-width:70px; height:auto;">
                            </div>
                        @endif
                        </td>

                        <td>
                            <a href="{{route('product.edit', ['product' => $product])}}">Edit</a>
                        </td>
                        <td>
                            <form method="post" action="{{route ('product.destroy', ['product' => $product])}}">
                                @csrf
                                @method('delete')
                                <input type="submit" value="Delete" />
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
