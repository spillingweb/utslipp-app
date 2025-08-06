<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['id', 'name'];

    public $timestamps = false;

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false; 

    public function tilsyn_objects()
    {
        return $this->hasMany(Tilsyn_object::class);
    }
}
