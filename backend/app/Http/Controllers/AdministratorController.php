<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdminResource;
use App\Models\Administrator;
use Illuminate\Http\Response;

class AdministratorController extends Controller
{
    public function index(): Response
    {
        $admin = Administrator::get();
        $user = auth()->user();

        if (!$admin->where("username", $user->username)->first()) {
            return response([
                "status" => "forbidden",
                "message" => "You are not the administrator",
            ], 403);
        };

        return response([
            "totalElements" => count($admin),
            "content" => AdminResource::collection($admin),
        ], 201);
    }
}
