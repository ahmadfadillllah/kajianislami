<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuteKajian extends Model
{
    use HasFactory;

    protected $table = "rute_kajian";
    public $timestamps = false;

    public function kajian_islami()
    {
        return $this->belongsTo('App\Models\KajianIslami', 'kajian_islami_id');
    }
}
