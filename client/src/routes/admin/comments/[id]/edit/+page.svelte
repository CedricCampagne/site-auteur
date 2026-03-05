<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Comment } from '$lib/types.js';
    export let data;

    // Clone pour éviter de modifier data directement
    const comment: Comment = structuredClone(data.comment);

    // Messages
    let successMessage = "";
    let errorMessage = "";

    // Validation simple
    $: contentError = comment.content.trim().length < 5
        ? "Le commentaire doit contenir au moins 5 caractères."
        : "";

    $: isFormValid = !contentError;

    async function handleSubmit() {
        successMessage = "";
        errorMessage = "";

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/comments/${comment.id_comment}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        content: comment.content,
                        is_visible: comment.is_visible
                    })
                }
            );

            if (res.ok) {
                goto('/admin/comments?updated=1');
            } else {
                errorMessage = "Erreur lors de la mise à jour";
            }
        } catch (err) {
            errorMessage = "Impossible de contacter le serveur";
        }
    }
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-4xl font-black text-center mb-4">
        Édition du commentaire
    </h2>

    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
        <!-- Auteur -->
        <label>
            Auteur
            <input
                type="text"
                value={comment.user.username}
                disabled
                class="border p-2 w-full bg-gray-100"
            />
        </label>
        <!-- Chronique -->
        <label>
            Chronique
            <input
                type="text"
                value={comment.chronicle.title}
                disabled
                class="border p-2 w-full bg-gray-100"
            />
        </label>
        <!-- Contenu -->
        <label>
            Commentaire
            <textarea
                bind:value={comment.content}
                rows="4"
                class="border p-2 w-full"
            ></textarea>
            <div class="h-10 py-2">
                {#if contentError}
                    <p class="text-accent1">
                        {contentError}
                    </p>
                {/if}
            </div>
        </label>
        <!-- Visibilité -->
        <label class="flex items-center gap-2">
            <input bind:checked={comment.is_visible} type="checkbox" />
            Commentaire visible
        </label>
        <!-- Bouton + messages -->
        <div class="flex items-center gap-6">
            <button
                type="submit"
                class="max-w-50 bg-accent2 text-white px-4 py-2 rounded hover:bg-accent1 transition-all duration-500"
                disabled={!isFormValid}
            >
                Mettre à jour
            </button>
            {#if successMessage}
                <p class="bg-green-600 text-white font-semibold p-2 rounded-xs">
                    {successMessage}
                </p>
            {/if}
            {#if errorMessage}
                <p class="bg-red-700 text-white font-semibold p-2 rounded-xs">
                    {errorMessage}
                </p>
            {/if}
        </div>
    </form>
</section>
