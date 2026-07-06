import React, { useState } from "react";
import SearchInput from "../components/common/SearchInput";
import StatusBadge from "../components/common/StatusBadge";
import AddPatientModal from "../components/patients/AddPatientModal";

const Patients = () => {
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const [patients, setPatients] = useState([
    {
      name: "John",
      age: 25,
      gender: "Male",
      mobile: "9999999999",
      email: "john@gmail.com",
      status: "Active",
    },
    {
      name: "Amit",
      age: 30,
      gender: "Male",
      mobile: "8888888888",
      email: "amit@gmail.com",
      status: "Pending",
    },
  ]);

    const [editIndex, setEditIndex] = useState(null);

     const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

 const addPatient = (patient) => {
  if (editIndex !== null) {
    const updated = [...patients];
    updated[editIndex] = patient;
    setPatients(updated);
    setEditIndex(null);
  } else {
    setPatients([...patients, patient]);
  }
};

const handleDelete = (index) => {
  const updated = patients.filter((_, i) => i !== index);
  setPatients(updated);
};


  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h2>Patients</h2>

       <button
  className="btn btn-primary"
  onClick={() => {
    setEditIndex(null);   // 🔥 RESET EDIT MODE
    setShowModal(true);   // open modal
  }}
          
        >
          + Add Patient
        </button>

      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search Patient..."
      />

      <table className="table table-bordered table-hover">

        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredPatients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.mobile}</td>
              <td>{patient.email}</td>
              <td>
                <StatusBadge status={patient.status} />
              </td>
              <td>
                <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => {
                setEditIndex(index);
                setShowModal(true);
            }}
       >
     Edit

</button>

         <button
     className="btn btn-sm btn-danger"
     onClick={() => handleDelete(index)}
    >
          Delete
            </button>

              </td>
            </tr>
          ))}

        </tbody>

      </table>

      <AddPatientModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={addPatient}
        editData={editIndex !== null ? patients[editIndex] : null}
      />

    </div>
  );
};

export default Patients;