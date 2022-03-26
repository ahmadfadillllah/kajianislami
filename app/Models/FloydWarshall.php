<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FloydWarshall extends Model
{
    use HasFactory;
    protected $table = 'floyd_warshall';
}
