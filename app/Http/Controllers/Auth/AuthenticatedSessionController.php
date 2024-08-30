<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */

    public function store(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        return response()->json(['success' => true, 'user' => $user], 200);
    } else {
        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        // Logout the user from the 'api' guard
        Auth::guard('api')->logout();

        // Invalidate the current session to prevent reuse (if sessions are used)
        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        // Return a response indicating successful logout
        return response()->json(['message' => 'Logged out successfully']);
    }



}
