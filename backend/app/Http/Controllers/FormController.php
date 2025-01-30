<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFormRequest;
use App\Models\Form;

class FormController extends Controller
{
    function store(CreateFormRequest $request)
    {
        $form = $request->user()->forms()->create([
            "name" => $request->name,
            "slug" => $request->slug,
            "description" => $request->description,
            "limit_one_response" => $request->limit_one_response,
        ]);

        if ($request->has('allowed_domains')) {
            foreach ($request->allowed_domains as $allowed_domain) {
                $form->allowedDomains()->create([
                    "domain" => $allowed_domain,
                ]);
            }
        }

        return response([
            "message" => "Create form success",
            "form" => $form,
        ]);
    }

    function index()
    {
        $form = auth()->user()->forms;
        return response([
            "message" => "Get all forms success",
            "forms" => $form,
        ]);
    }

    function show(string $slug)
    {
        $form = Form::where("slug", $slug)->first();

        if (!$form) {
            return response([
                "message" => "Form not found"
            ], 404);
        }

        $user = auth()->user();
        $userEmail = explode("@", $user->email);

        if (!$form->allowedDomains->isEmpty()) {
            if (!$form->allowedDomains->where("domain", $userEmail[1])->first()) {
                return response([
                    "message" => "Forbidden access"
                ], 403);
            };
        }

        return response([
            "message" => "Get form success",
            "form" => [
                "id" => $form->id,
                "name" => $form->name,
                "slug" => $form->slug,
                "description" => $form->description,
                "limit_one_response" => $form->limit_one_response,
                "creator_id" => $form->creator_id,
                "allowed_domains" => $form->allowed_domains,
                "questions" => $form->questions,
            ]
        ]);
    }
}
