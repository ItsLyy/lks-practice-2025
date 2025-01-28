<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddQuestionRequest extends FormRequest
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
        return [
            "name" => ["required"],
            "choice_type" => ["required", Rule::in(['short answer', 'paragraph', 'date', 'multiple choice', 'dropdown', 'checkboxes'])],
            "choices" => ["required_if:choice_type,multiple choice,choice_type,dropdown,choice_type,checkboxes", "string", "array"]
        ];
    }
}
