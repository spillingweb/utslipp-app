<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['number', 'name'];

    public $timestamps = false;

    public function tilsyn_objects()
    {
        return $this->hasMany(Tilsyn_object::class);
    }
}
