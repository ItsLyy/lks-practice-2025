<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Form extends Model
{
    public $timestamps = false;

    protected $fillable = [
        "name",
        "slug",
        "description",
        "limit_one_response",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "creator_id", "id");
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(Response::class);
    }

    public function allowedDomains(): HasMany
    {
        return $this->hasMany(AllowedDomain::class);
    }
}
