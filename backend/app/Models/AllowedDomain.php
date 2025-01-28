<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AllowedDomain extends Model
{
    public $timestamps = false;

    protected $fillable = [
        "form_id",
        "domain",
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}
