<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{


public function edited(Request $request, $userId)
{
    try {
        // Find the user profile by userId
        $profile = Auth::user()->find($userId);

        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($profile->id) // Use $profile->id for ignoring the current user's email
            ],
        ]);

        // Update the profile
        $profile->update($validatedData);

        // Return updated profile
        return response()->json($profile, 200);
    } catch (ValidationException $e) {
        // Return validation errors
        return response()->json(['errors' => $e->errors()], 422);
    } catch (\Exception $e) {
        // Return a generic error message
        return response()->json(['message' => 'An error occurred while updating the profile'], 500);
    }
}




    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
