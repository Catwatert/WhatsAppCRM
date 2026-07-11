<!DOCTYPE html>
<html>
<head>
    <title>Add Lead</title>
</head>
<body>

<h2>Add Lead</h2>

<form action="{{ route('crm-leads.store') }}" method="POST">
    @csrf

    <label>Patient Name</label><br>
    <input type="text" name="patient_name"><br><br>

    <label>Mobile</label><br>
    <input type="text" name="mobile"><br><br>

    <label>Lead Status</label><br>

<select name="lead_status">
    <option value="New Inquiry">New Inquiry</option>
    <option value="Contacted">Contacted</option>
    <option value="Appointment Booked">Appointment Booked</option>
    <option value="Visited">Visited</option>
    <option value="Follow-up Required">Follow-up Required</option>
    <option value="Closed">Closed</option>
</select>

<br><br>

    <label>Assigned To</label><br>
    <input type="text" name="assigned_to"><br><br>

    <label>Notes</label><br>
    <textarea name="notes"></textarea><br><br>

    <button type="submit">Save Lead</button>

</form>

</body>
</html>