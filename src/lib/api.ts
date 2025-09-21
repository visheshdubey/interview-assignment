export const api = {
    getContacts: async () => {
        const response = await fetch("http://localhost:3000/contacts");
        return await response.json();
    },
    getContactById: async (id: string) => {
        const response = await fetch(`http://localhost:3000/contacts/${id}`);
        return await response.json();
    },
    markContactAsFavorite: async (id: string) => {
        const contactById = await api.getContactById(id);
        const contact = await contactById.json();

        const response = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ ...contact, favorite: true }),
        });

        return await response.json();
    },
};
