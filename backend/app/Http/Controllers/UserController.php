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
        $users = User::first()->isAdmin();

        return response($users);

        return response([
            "totalElements" => count($users),
            "content" => AdminResource::collection($users),
        ]);
    }

    public function store(SignupRequest $request): Response
    {
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

        $userDeleted->delete();

        return response("", 204);
    }
}
