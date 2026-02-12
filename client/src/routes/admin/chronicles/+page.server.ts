export async function load({ fetch }) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/chronicles`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les chroniques");
    }

    const chronicles = await res.json();
    return { chronicles };
}

