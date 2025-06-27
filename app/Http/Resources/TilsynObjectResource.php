<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TilsynObjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at->toFormattedDateString(),
            'updated_at' => $this->updated_at->toFormattedDateString(),
            'geom' => $this->geom,
            'gnr' => $this->gnr,
            'bnr' => $this->bnr,
            'adresse' => $this->adresse,
            'bygning' => $this->bygning,
            'sone' => $this->sone,
            'status' => $this->status,
            'saksnr' => $this->saksnr,
            'kommentar' => $this->kommentar,
            'frist' => $this->frist,
            'saksbeh' => $this->saksbeh,
            'endret_av' => $this->endret_av,
            'svarskjema' => $this->svarskjema,
            'komtek' => $this->komtek,
            'slam' => $this->slam,
            'kontroll' => $this->kontroll,
            'arkiv' => $this->arkiv,
            'hjemmel' => $this->hjemmel,
            'project_id' => $this->project_id,
        ];
    }
}
