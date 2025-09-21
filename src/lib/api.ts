export const api = {
    getAllContacts: async () => {
        const response = await fetch("http://localhost:3000/contacts");
        return await response.json();
    },
    getPaginatedContacts: async (page = 1, limit = 100) => {
        const response = await fetch(`http://localhost:3000/contacts?_page=${page}&_limit=${limit}`);
        const data = await response.json();
        const totalCount = parseInt(response.headers.get("x-total-count") || "1");

        const totalPages = Math.ceil(totalCount / limit);
        return {
            data,
            hasNextPage: page < totalPages,
            totalPages,
        };
    },
    getFavoritesContacts: async () => {
        const response = await fetch(`http://localhost:3000/contacts?favorite=true`);
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
