<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'patient_name',
        'mobile',
        'lead_status',
        'assigned_to',
        'notes',
    ];
}