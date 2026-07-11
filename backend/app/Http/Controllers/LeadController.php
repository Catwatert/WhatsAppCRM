<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $leads = Lead::all();

    return view('leads.index', compact('leads'));
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('leads.create');
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $request->validate([
        'patient_name' => 'required',
        'mobile' => 'required',
        'lead_status' => 'required',
        'assigned_to' => 'required',
        'notes' => 'nullable',
    ]);

    Lead::create($request->all());

    return redirect()->route('crm-leads.index')
    ->with('success', 'Lead Added Successfully');
}

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
public function edit($id)
{
    $lead = Lead::findOrFail($id);

    return view('leads.edit', compact('lead'));
}

    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, $id)
{
    $request->validate([
        'patient_name' => 'required',
        'mobile' => 'required',
        'lead_status' => 'required',
        'assigned_to' => 'required',
        'notes' => 'nullable',
    ]);

    $lead = Lead::findOrFail($id);

    $lead->update([
        'patient_name' => $request->patient_name,
        'mobile' => $request->mobile,
        'lead_status' => $request->lead_status,
        'assigned_to' => $request->assigned_to,
        'notes' => $request->notes,
    ]);

    return redirect()->route('crm-leads.index')
        ->with('success', 'Lead Updated Successfully');
}

    /**
     * Remove the specified resource from storage.
     */
public function destroy($id)
{
    $lead = Lead::findOrFail($id);

    $lead->delete();

    return redirect()->route('crm-leads.index')
        ->with('success', 'Lead Deleted Successfully');
}
}
