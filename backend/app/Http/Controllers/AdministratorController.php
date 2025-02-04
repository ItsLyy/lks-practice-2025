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

        return response([
            "totalElements" => count($admin),
            "content" => AdminResource::collection($admin),
        ], 201);
    }
}
