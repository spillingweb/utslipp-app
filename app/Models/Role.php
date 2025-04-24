<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name'];

    public $timestamps = false;

    const ROLES = [
        'Admin' => 'Admin',
        'Edit' => 'Redigering',
        'View' => 'Innsyn',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
