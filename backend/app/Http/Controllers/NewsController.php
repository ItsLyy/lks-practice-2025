<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateNewsRequest;
use App\Models\News;
use Illuminate\Http\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        $news = News::get();

        return response([
            "status" => "success",
            "data" => $news,
        ]);
    }

    public function store(CreateNewsRequest $request): Response
    {
        $user = auth()->user();
        $news = $user->news()->create([
            "title" => $request->title,
            "content" => $request->content,
            "created_at" => now(),
        ]);

        return response([
            "status" => "success",
            "message" => "News created successfully",
            "data" => $news,
        ], 201);
    }
}
