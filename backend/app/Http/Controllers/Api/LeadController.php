<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    // Get all leads
    public function index()
    {
        return response()->json(Lead::latest()->get());
    }

    // Create a new lead
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'lead_status' => 'required|string',
            'assigned_to' => 'nullable|integer|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $lead = Lead::create($validated);

        return response()->json([
            'message' => 'Lead created successfully.',
            'lead' => $lead,
        ], 201);
    }

    // Get a single lead
    public function show($id)
    {
        return response()->json(
            Lead::findOrFail($id)
        );
    }

    // Update a lead
    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'lead_status' => 'required|string',
            'assigned_to' => 'nullable|integer|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        return response()->json([
            'message' => 'Lead updated successfully.',
            'lead' => $lead,
        ]);
    }

    // Delete a lead
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);

        $lead->delete();

        return response()->json([
            'message' => 'Lead deleted successfully.',
        ]);
    }
}