<?php

namespace App\Rules;

use App\Models\Question;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateAnswerValue implements ValidationRule
{
    private $questionId;

    public function __construct($questionId)
    {
        $this->questionId = $questionId;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $question = Question::find($this->questionId);
        if ($question->is_required && !$value) {
            $fail("This field must be filled in.");
        }
    }
}
