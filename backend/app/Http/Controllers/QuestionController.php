<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddQuestionRequest;
use App\Models\Form;

class QuestionController extends Controller
{
    function store(string $slug, AddQuestionRequest $request)
    {
        $user = auth()->user();

        $form = Form::where("slug", $slug)->first();

        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }

        $form = $form->where("creator_id", $user->id)->first();

        if (!$form) {
            return response([
                "message" => "Forbidden access"
            ], 404);
        }

        $question = $form->questions()->create([
            "name" => $request->name,
            "choice_type" => $request->choice_type,
            "is_required" => $request->is_required,
            "choices" => $request->choices ? join(",", $request->choices) : null,
        ]);

        return response([
            "message" => "Add question success",
            "question" => $question
        ]);
    }

    function destroy(string $slug, int $id)
    {
        $user = auth()->user();

        $form = Form::where("slug", $slug)->first();

        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }

        $form = $form->where("creator_id", $user->id)->first();

        if (!$form) {
            return response([
                "message" => "Forbidden access"
            ], 404);
        }

        $question = $form->questions()->find($id);

        if (!$question) {
            return response([
                "message" => "Question not found"
            ], 404);
        }

        $question->delete();

        return response([
            "message" => "Remove question success"
        ], 200);
    }
}
