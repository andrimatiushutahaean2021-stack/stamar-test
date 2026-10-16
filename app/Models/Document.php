<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'region_code',
        'region_number',
        'forecast_date',
        'period_type',
        'description',
        'file_path',
        'file_type',
        'file_size',
    ];

    protected $casts = [
        'forecast_date' => 'date',
        'region_number' => 'integer',
    ];
}
