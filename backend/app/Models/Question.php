<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Question extends Model
{
    public $timestamps = false;

    protected $fillable = [
        "name",
        "choice_type",
        "choices",
        "is_required",
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    public function answers(): BelongsToMany
    {
        return $this->belongsToMany(Response::class, "answers", "question_id", "response_id")->withPivot(['value']);
    }
}
