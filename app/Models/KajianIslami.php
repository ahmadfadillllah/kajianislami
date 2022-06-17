<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KajianIslami extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return asset('gambar/icon.png');
    }

    public function rute()
    {
        return $this->hasMany(RuteKajian::class, "kajian_islami_id", "id");
    }

    public function view_modal_edit()
    {
        $item = $this;
        return view("dashboard.kajian-islami.modal-edit", compact("item"));
    }
}
