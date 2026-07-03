<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class DashboardController extends Controller
{
    public function index()
{
    return response()->json([
        'totalContacts' => Contact::count(),
    ]);
}
}
