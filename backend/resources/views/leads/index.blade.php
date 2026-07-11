<!DOCTYPE html>
<html>
<head>
    <title>Lead List</title>
</head>
<body>

<h2>Lead List</h2>

@if(session('success'))
    <p style="color:green;">
        {{ session('success') }}
    </p>
@endif

<a href="{{ route('crm-leads.create') }}">Add Lead</a>

<table border="1" cellpadding="10">
    <tr>
        <th>Patient Name</th>
        <th>Mobile</th>
        <th>Status</th>
        <th>Assigned To</th>
        <th>Notes</th>
        <th>Action</th>
    </tr>

    @foreach($leads as $lead)
<tr>
    <td>{{ $lead->patient_name }}</td>
    <td>{{ $lead->mobile }}</td>
    <td>{{ $lead->lead_status }}</td>
    <td>{{ $lead->assigned_to }}</td>
    <td>{{ $lead->notes }}</td>

    <td>
        <a href="{{ route('crm-leads.edit', $lead->id) }}">Edit</a>

        <form action="{{ route('crm-leads.destroy', $lead->id) }}" method="POST" style="display:inline;">
            @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
        </form>
    </td>

</tr>
@endforeach

</table>

</body>
</html>