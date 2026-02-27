<script lang="ts">
	import type { User, UserFormCreate } from '$lib/types.js';
    import { goto } from '$app/navigation';

    const user: UserFormCreate = {
    username: "",
    email: "",
    password: "",
    is_active: true
    };

    $: usernameError =
    user.username.trim().length < 3
        ? "Le nom d'utilisateur doit faire au moins 3 caractères."
        : user.username.trim().length > 50 ?
        "Le nom d'utilisateur ne peut pas dépasser 50 caractères."
        : "";

    $: emailError =
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
        ? "Email invalide."
        : user.email.trim().length > 50 ?
        "L'email ne peut pas dépasser 50 caractères." :
        "";

    $: passwordError =
    user.password.trim().length < 10
        ? "Le mot de passe doit faire au moins 10 caractères."
        : !/[A-Z]/.test(user.password)
        ? "Le mot de passe doit contenir au moins une lettre majuscule."
        : "";

    // Form valid si aucune erreur
    $: isFormValid =
        !usernameError &&
        !emailError &&
        !passwordError
    

    let successMessage = "";
    let errorMessage = "";

    async function handleSubmit() {
        
        // manque la recuperation de user avec les value des champs

        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (res.ok) {
            successMessage = "Utilisateur créé avec succès.";
            errorMessage = "";
            setTimeout(()=>goto("/admin/users"),3000)
        } else {
           
            const error = await res.json();

        console.log("error 0", error.error?.[0]);

        if (Array.isArray(error.error)) {
            errorMessage = error.error.join(" / ");
        } else if (typeof error.error === "string") {
            errorMessage = error.error;
        } else {
            errorMessage = "Erreur lors de la création.";
        }
        successMessage = "";
        }

    }
    
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-4xl font-black text-center mb-4">Création d'un utilisateur</h2>

    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4" >
        
        <label>
            Username
            <input bind:value={user.username} type="text" class="border p-2 w-full" />
            <div class="h-10 py-2">
                {#if usernameError}<p class="text-accent1">{usernameError}</p>{/if}
            </div>
        </label>

        <label>
            Email
            <input bind:value={user.email} type="text" class="border p-2 w-full" />
            <div class="h-10 py-2">
                {#if emailError}<p class="text-accent1">{emailError}</p>{/if}
            </div>
        </label>

        <label>
            Password
            <input bind:value={user.password} type="password" class="border p-2 w-full" />
            <div class="h-10 py-2">
                {#if passwordError}<p class="text-accent1">{passwordError}</p>{/if}
            </div>
        </label>

        <label class="flex items-center gap-2">
            <input bind:checked={user.is_active} type="checkbox"/>
            Activer l'utilisateur
        </label>

        <div class="flex items-center gap-6">
            <button
                type="submit"
                class="max-w-50 bg-accent2 text-white px-4 py-2 rounded hover:bg-accent1 transition-all duration-500"
                disabled={!isFormValid}
            >
                Mettre a jour
            </button>

            {#if successMessage}
                <p class="bg-green-600 text-white font-semibold p-2 rounded-xs">{successMessage}</p>
            {/if}

            {#if errorMessage}
                <p class="bg-red-700 text-white font-semibold p-2 rounded-xs">{errorMessage}</p>
            {/if}
        </div>
    </form>
</section>