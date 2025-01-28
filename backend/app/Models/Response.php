<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Response extends Model
{
    public $timestamps = false;

    protected $fillable = [
        "user_id",
        "date"
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function answers(): BelongsToMany
    {
        return $this->belongsToMany(Question::class, "answers", "response_id", "question_id")->withPivot(['value']);
    }
}
