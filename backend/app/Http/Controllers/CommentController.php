<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentRequest;
use App\Models\News;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    public function store(int $id, CreateCommentRequest $request): Response
    {
        $user = auth()->user();
        $news = News::find($id);
        $comment = $news->comments()->create([
            "comment_text" => $request->comment_text,
            "user_id" => $user->user_id,
        ]);
        return response([
            "status" => "successfully",
            "data" => $comment,
        ], 201);
    }
}
