export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

export async function registerUser(data: RegisterPayload) {
    console.log(import.meta.env.VITE_API_URL);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",     // autorises l’envoi/réception de cookies
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const error = await res.json().catch(() => null); // récupère le message d'erreur du backend (ou null si pas de JSON)
       // Le backend renvoie error: string[]
       const msg = Array.isArray(error?.error) ? error.error.join(" / ") : error?.message || error?.error || "Erreur lors de l'inscription";
       throw new Error(msg);
    }

    return res.json();
}