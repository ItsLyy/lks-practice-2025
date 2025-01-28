<?php

namespace App\Http\Requests;

use App\Rules\ValidateAnswerValue;
use Illuminate\Foundation\Http\FormRequest;

class SubmitResponseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !empty(auth()->user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rule =  [
            "answers" => ["array"],
        ];

        foreach ($this->answers as $index => $answer) {
            $rule["answers.$index.value"] = [new ValidateAnswerValue($answer['question_id'])];
        }

        return $rule;
    }
}
