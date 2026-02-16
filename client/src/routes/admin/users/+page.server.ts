export async function load({ fetch }){
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les utilisateurs");
    }
    
    const users = await res.json();
    return { users };
}
