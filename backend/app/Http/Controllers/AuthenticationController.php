<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request): Response
    {
        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                "status" => "error",
                "message" => "Email or password is incorect"
            ], 401);
        }

        $token = $user->createToken($user->username);

        return response([
            "status" => "success",
            "message" => "Login berhasil",
            "data" => [
                "token" => $token->plainTextToken
            ]
        ], 200);
    }

    public function register(RegisterRequest $request): Response
    {
        $user = User::create([
            "email" => $request->email,
            "password" => $request->password,
            "username" => $request->username,
            "role" => $request->role,
        ]);

        return response([
            "message" => "User registered successfully",
            "user" => $user,
        ], 201);
    }

    public function logout(): Response
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();
        return response([], 200);
    }
}
