import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
} from "../services/contactService";

const DEBOUNCE_DELAY = 500;

function Contacts() {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [contacts, setContacts] = useState([]);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [editingContact, setEditingContact] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);


   


    useEffect(() => {
        fetchContacts();
    }, [debouncedSearch, page]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [search]);

     const fetchContacts = async () => {
        try {
            const response = await getContacts(debouncedSearch, page);
            setContacts(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleAddContact = () => {
        setEditingContact(null);

        setName("");
        setPhone("");
        setEmail("");

        setShowModal(true);
    };


    const handleSaveContact = async () => {
        try {
            if (editingContact) {
                await updateContact(editingContact.id, {
                    name,
                    phone,
                    email,
                });
                toast.success("Contact updated successfully!");
            } else {
                await createContact({
                    name,
                    phone,
                    email,
                });
                toast.success("Contact added successfully!");
            }
            await fetchContacts();
            setName("");
            setPhone("");
            setEmail("");
            setShowModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };



    const handleDeleteContact = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!confirmed) {
            return;
        }
        try {
            await deleteContact(id);

            toast.success("Contact deleted successfully!");

            await fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };



    const handleEditContact = (contact) => {
        setEditingContact(contact);

        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.email || "");

        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);

        setEditingContact(null);

        setName("");
        setPhone("");
        setEmail("");
    };




    return (
        <MainLayout>
            <div className="container-fluid py-4">
                <PageHeader
                    title="Contacts"
                    buttonText="Add Contact"
                    icon="bi-plus-lg"
                    onButtonClick={handleAddContact}
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="card">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleEditContact(contact)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteContact(contact.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => setPage(page - 1)}
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>

                        <div className="d-flex gap-1">
                            {Array.from({ length: lastPage }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`btn ${currentPage === index + 1
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => setPage(page + 1)}
                            disabled={currentPage === lastPage}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
            {
                showModal && (
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {editingContact ? "Edit Contact" : "Add Contact"}
                                    </h5>
                                    <button
                                        className="btn-close"
                                        onClick={handleCloseModal}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="mb-2">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSaveContact}
                                    >
                                        {editingContact ? "Update" : "Save"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
            {
                showModal && (
                    <div className="modal-backdrop fade show"></div>
                )
            }
        </MainLayout >
    );
}

export default Contacts;