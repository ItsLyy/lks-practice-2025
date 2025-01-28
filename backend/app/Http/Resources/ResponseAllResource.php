<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResponseAllResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $response = [
            "date" => $this->date,
            "user" => $this->user,
        ];

        foreach ($this->answers as $answer) {
            $response["answers"][$answer->name] = $answer->pivot->value;
        }

        return $response;
    }
}
