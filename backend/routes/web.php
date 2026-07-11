<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeadController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('crm-leads', LeadController::class)->names('crm-leads');