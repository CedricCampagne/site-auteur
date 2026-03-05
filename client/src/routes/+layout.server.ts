export const load = async ({ fetch, cookies }) => {
    const token = cookies.get("token");

    if(!token) {
        return { user: null };
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        credentials: "include"
    });

    
    if(!res.ok) {
        return { user: null };
    }

    const json = await res.json();

    return { user: json.data! };
}