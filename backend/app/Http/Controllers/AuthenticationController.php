<?php

namespace App\Http\Controllers;

use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Administrator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function signin(SigninRequest $request): Response
    {
        $isUser = User::where("username", $request->username)->first();
        $isAdmin = Administrator::where("username", $request->username)->first();
        $user = null;

        if ($isUser) {
            $user = $isUser;
        } else if ($isAdmin) {
            $user = $isAdmin;
        }

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                "status" => "invalid",
                "message" => "Wrong username or password",
            ], 401);
        }

        $token = $user->createToken($user->username);

        return response([
            "status" => "success",
            "token" => $token->plainTextToken,
        ]);
    }

    public function signup(SignupRequest $request): Response
    {
        $user = User::create([
            "username" => $request->username,
            "password" => $request->password,
        ]);

        $token = $user->createToken($user->username);

        return response([
            "status" => "success",
            "token" => $token->plainTextToken,
        ], 201);
    }


    public function signout(): Response
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return response([
            "status" => "success",
        ]);
    }
}
