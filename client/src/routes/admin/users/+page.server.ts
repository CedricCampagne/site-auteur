export async function load({ fetch }){
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les utilisateurs");
    }
    
    const json = await res.json();
    const users = json.data!;
    
    return { users };
}
