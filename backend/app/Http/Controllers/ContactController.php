<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $search = $request->query('search');

    $contacts = Contact::when($search, function ($query, $search) {
        $query->where('name', 'like', "%{$search}%")
              ->orWhere('phone', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
    })->paginate(10);

    return response()->json($contacts);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $contact = Contact::create($request->all());

        return response()->json([
            'message' => 'Contact created successfully',
            'contact' => $contact,
        ], 201);
    }
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);

        $contact->delete();

        return response()->json([
            'message' => 'Contact deleted successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
        ]);

        $contact = Contact::findOrFail($id);

        $contact->update($validated);

        return response()->json([
            'message' => 'Contact updated successfully.',
            'contact' => $contact,
        ]);
    }
}
