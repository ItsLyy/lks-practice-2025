<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $primaryKey = "comment_id";
    public $timestamps = false;

    protected $fillable = [
        "comment_text",
        "user_id",
    ];

    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class, "news_id", "news_id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "user_id");
    }
}
