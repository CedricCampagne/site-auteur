export async function load({ fetch }){
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/chronicles`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les chroniques");
    }

    const json = await res.json();
    const chronicles = json.data!;

    return { chronicles };
}

