export const load = async ({ fetch }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chronicles`);

    if (!res.ok) {
        throw new Error("Impossible de récupérer les chroniques");
    }

    const chronicles = await res.json();

    return { chronicles };
};
