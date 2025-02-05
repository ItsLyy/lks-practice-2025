<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class News extends Model
{
    protected $primaryKey = "news_id";
    protected $fillable = [
        "title",
        "content",
        "status",
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, "author_id", "user_id");
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, "news_id");
    }
}
