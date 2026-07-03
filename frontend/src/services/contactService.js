import api from "./api";

export const getContacts = (search = "", page = 1) => {
    return api.get("/contacts", {
        params: {
            search,
            page,
        },
    });
};

export const createContact = (contact) => {
    return api.post("/contacts", contact);
};

export const updateContact = (id, contact) => {
    return api.put(`/contacts/${id}`, contact);
};

export const deleteContact = (id) => {
    return api.delete(`/contacts/${id}`);
};