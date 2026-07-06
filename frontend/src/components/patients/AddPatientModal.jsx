import React, { useState } from "react";

const AddPatientModal = ({ show, onClose, onSave }) => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(patient);

    setPatient({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      email: "",
      status: "Active",
    });

    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Add Patient</h5>
            <button
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">

            <input
              className="form-control mb-2"
              placeholder="Patient Name"
              name="name"
              value={patient.name}
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              placeholder="Age"
              name="age"
              value={patient.age}
              onChange={handleChange}
            />

            <select
              className="form-select mb-2"
              name="gender"
              value={patient.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              className="form-control mb-2"
              placeholder="Mobile"
              name="mobile"
              value={patient.mobile}
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              placeholder="Email"
              name="email"
              value={patient.email}
              onChange={handleChange}
            />

            <select
              className="form-select"
              name="status"
              value={patient.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>

          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;