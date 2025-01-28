<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubmitResponseRequest;
use App\Http\Resources\ResponseAllResource;
use App\Models\Form;

class ResponseController extends Controller
{
    function store(string $slug, SubmitResponseRequest $request)
    {
        $user = auth()->user();
        $form = Form::where("slug", $slug)->first();

        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }

        $userEmail = explode("@", $user->email);

        foreach ($form->allowedDomains as $allowedDomain) {
            if ($allowedDomain->domain != $userEmail[1]) {
                return response([
                    "message" => "Forbidden access"
                ], 403);
            }
        }

        $userResponse = $user->responses()->where("form_id", $form->id)->get();
        if (!$userResponse->isEmpty() && $form->limit_one_response) {
            return response([
                "message" => "You can not submit form twice"
            ], 401);
        }

        $response = $form->responses()->create([
            "user_id" => $user->id,
            "date" => now(),
        ]);

        foreach ($request->answers as $answer) {
            $response->answers()->syncWithoutDetaching([
                $answer['question_id'] =>
                [
                    "value" => $answer['value'],
                ]
            ]);
        }

        return response([
            "message" => "Submit response success"
        ]);
    }

    function index(string $slug)
    {
        $user = auth()->user();
        $form = Form::where("slug", $slug)->first();

        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }

        if ($user->id != $form->creator_id) {
            return response([
                "message" => "Forbidden access"
            ], 403);
        }

        return response([
            "message" => "Get responses success",
            "responses" => ResponseAllResource::collection($form->responses)
        ]);
    }
}
