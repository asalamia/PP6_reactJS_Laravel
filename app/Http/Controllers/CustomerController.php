<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Models\Customer;

class CustomerController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers);
    }

    // Show the form for creating a new resource
    public function create()
    {
        // Return a form or view for creating a new customer if needed
    }

    // Store a newly created resource in storage
    public function store(Request $request)
    {
        try {
            // Validate the request data
            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'contact_number' => 'required|string|max:15',
                'address' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:customers',
                'password' => 'required|string|min:8|confirmed',
            ]);
    
            // Return validation errors if validation fails
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            // Create a new customer in the database
            $customer = Customer::create([
                'first_name' => trim($request->first_name),
                'last_name' => trim($request->last_name),
                'contact_number' => trim($request->contact_number),
                'address' => trim($request->address),
                'email' => trim($request->email),
                'password' => Hash::make($request->password),
                'remember_token' => Str::random(60),
            ]);
    
            // Return a success response with the newly created customer data
            return response()->json(['message' => 'Customer registered successfully', 'customer' => $customer], 201);
        } catch (\Exception $e) {
            // Return an error response if registration fails
            return response()->json(['error' => 'Registration failed', 'message' => $e->getMessage()], 500);
        }
    }

    

    // Display the specified resource
    public function show($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        return response()->json($customer);
    }

    // Show the form for editing the specified resource
    public function edit($id)
    {
        // Return a form or view for editing a customer if needed
    }

    // Update the specified resource in storage
    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $customer->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'contact_number' => $request->contact_number,
            'address' => $request->address,
            'email' => $request->email,
            'password' => $request->filled('password') ? Hash::make($request->password) : $customer->password,
        ]);

        return response()->json(['message' => 'Customer updated successfully', 'customer' => $customer]);
    }

    // Remove the specified resource from storage
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        $customer->delete();
        return response()->json(['message' => 'Customer deleted']);
    }
}
