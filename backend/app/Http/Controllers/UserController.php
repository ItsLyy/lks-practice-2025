<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupRequest;
use App\Http\Resources\AdminResource;
use App\Models\Administrator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::get();

        $user = auth()->user();
        if (!Administrator::where("username", $user->username)) {
            return response([
                "status" => "forbidden",
                "message" => "You are not the administrator",
            ], 403);
        }

        return response([
            "totalElements" => count($users),
            "content" => AdminResource::collection($users),
        ]);
    }

    public function store(SignupRequest $request): Response
    {
        $user = auth()->user();

        if (!Administrator::where("username", $user->username)->first()) {
            return response([
                "status" => "forbidden",
                "message" => "You are not the administrator",
            ], 403);
        };

        $admin = Administrator::create([
            "username" => $request->username,
            "password" => $request->password,
        ]);

        return response([
            "status" => "success",
            "username" => $admin
        ], 201);
    }

    public function update(Request $request, String $id): Response
    {
        $isUser = User::where("id", $id)->first();
        $isAdmin = Administrator::where("id", $id)->first();
        $userUpdated = null;

        if ($isUser) {
            $userUpdated = $isUser;
        } else if ($isAdmin) {
            $userUpdated = $isAdmin;
        } else {
            return response([
                "status" => "not-found",
                "message" => "Where the hell is he?"
            ], 403);
        }

        if (User::where("username", $request->username)->exists()) {
            return response([
                "status" => "invalid",
                "message" => "Username already exists"
            ], 400);
        }

        if (Administrator::where("username", $request->username)->exists()) {
            return response([
                "status" => "invalid",
                "message" => "Username already exists"
            ], 400);
        }

        $user = auth()->user();
        if (!Administrator::where("username", $user->username)) {
            return response([
                "status" => "forbidden",
                "message" => "You are not the administrator",
            ], 403);
        }

        if ($request->username) {
            $userUpdated->username = $request->username;
        }

        if ($request->password) {
            $userUpdated->password = $request->password;
        }

        $userUpdated->save();

        return response([
            "status" => "success",
            "username" => $userUpdated->username,
        ], 201);
    }

    public function destroy(String $id): Response
    {
        $isUser = User::where("id", $id)->first();
        $isAdmin = Administrator::where("id", $id)->first();
        $userDeleted = null;

        if ($isUser) {
            $userDeleted = $isUser;
        } else if ($isAdmin) {
            $userDeleted = $isAdmin;
        } else {
            return response([
                "status" => "not-found",
                "message" => "Where the hell is he?"
            ], 403);
        }

        $user = auth()->user();
        if (!Administrator::where("username", $user->username)) {
            return response([
                "status" => "forbidden",
                "message" => "You are not the administrator",
            ], 403);
        }

        $userDeleted->delete();

        return response("", 204);
    }
}
