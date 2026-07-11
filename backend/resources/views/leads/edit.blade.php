<!DOCTYPE html>
<html>
<head>
    <title>Edit Lead</title>
</head>
<body>

<h2>Edit Lead</h2>


<form action="/crm-leads/{{ $lead->id }}" method="POST">
    @csrf
    @method('PUT')

    <label>Patient Name</label><br>
    <input type="text" name="patient_name" value="{{ $lead->patient_name }}"><br><br>

    <label>Mobile</label><br>
    <input type="text" name="mobile" value="{{ $lead->mobile }}"><br><br>

    <label>Lead Status</label><br>
    <select name="lead_status">
        <option value="New Inquiry" {{ $lead->lead_status == 'New Inquiry' ? 'selected' : '' }}>New Inquiry</option>
        <option value="Contacted" {{ $lead->lead_status == 'Contacted' ? 'selected' : '' }}>Contacted</option>
        <option value="Appointment Booked" {{ $lead->lead_status == 'Appointment Booked' ? 'selected' : '' }}>Appointment Booked</option>
        <option value="Visited" {{ $lead->lead_status == 'Visited' ? 'selected' : '' }}>Visited</option>
        <option value="Follow-up Required" {{ $lead->lead_status == 'Follow-up Required' ? 'selected' : '' }}>Follow-up Required</option>
        <option value="Closed" {{ $lead->lead_status == 'Closed' ? 'selected' : '' }}>Closed</option>
    </select>

    <br><br>

    <label>Assigned To (User ID)</label><br>
    <input type="number" name="assigned_to" value="{{ $lead->assigned_to }}"><br><br>

    <label>Notes</label><br>
    <textarea name="notes">{{ $lead->notes }}</textarea><br><br>

    <button type="submit">Update Lead</button>

</form>

</body>
</html>