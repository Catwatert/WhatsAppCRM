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

  // NEW
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    setShowModal(false);
  };

  // UPDATED
  const handleDelete = () => {
    const updated = patients.filter((_, i) => i !== deleteIndex);
    setPatients(updated);

    setDeleteIndex(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h2>Patients</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditIndex(null);
            setShowModal(true);
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
      <div className="table-responsive">
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
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setDeleteIndex(index);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
      <nav className="d-flex justify-content-end mt-4">
        <ul className="pagination">

          <li className="page-item disabled">
            <button className="page-link">
              Previous
            </button>
          </li>

          <li className="page-item active">
            <button className="page-link">
              1
            </button>
          </li>

          <li className="page-item">
            <button className="page-link">
              2
            </button>
          </li>

          <li className="page-item">
            <button className="page-link">
              3
            </button>
          </li>

          <li className="page-item">
            <button className="page-link">
              Next
            </button>
          </li>

        </ul>
      </nav>
      <AddPatientModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={addPatient}
        editData={editIndex !== null ? patients[editIndex] : null}
      />

      {/* Delete Confirmation Modal */}

      {showDeleteModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Delete Patient
                </h5>
              </div>

              <div className="modal-body">
                Are you sure you want to delete this patient?
              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteIndex(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Patients;