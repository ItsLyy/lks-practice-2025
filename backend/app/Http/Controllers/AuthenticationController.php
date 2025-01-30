<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                "message" => "Email or password incorrect",
            ], 401);
        }

        $token = $user->createToken($user->name);

        return response([
            "message" => "Login success",
            "user" => [
                "name" => $user->name,
                "email" => $user->email,
                "accessToken" => $token->plainTextToken,
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response([
            "message" => "Logout Success"
        ]);
    }
}
