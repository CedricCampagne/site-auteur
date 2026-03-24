<script lang="ts">
   import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from "$app/environment";
    import type { Comment } from '$lib/types.js';
    export let data;

    // Clone pour éviter de modifier data directement
    const comment: Comment = structuredClone(data.comment);

    // Validation simple
    $: contentError = comment.content.trim().length < 5
        ? "Le commentaire doit contenir au moins 5 caractères."
        : "";

    $: isFormValid = !contentError;

    $: if (browser && $page.form?.success) {
        setTimeout(() => goto('/admin/comments'), 1500);
    }
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-4xl font-black text-center mb-4">
        Édition du commentaire
    </h2>

    <form method="POST" class="flex flex-col gap-4">
        <div class="w-full sm:w-2/4 text-center mx-auto">
            {#if $page.form?.error}
                <p class="bg-red-700 text-white font-semibold p-2 rounded-xs">
                    {$page.form.error}
                </p>
            {/if}
            {#if $page.form?.success}   
                <p class="bg-green-600 text-white font-semibold p-2 rounded-xs">
                    Utilisateur mis a jour avec succès !
                </p>
            {/if}
        </div>
        <!-- Auteur -->
        <label>
            Auteur
            <input
                type="text"
                value={comment.user.username}
                name="username"
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
                name="chronicle.title"
                disabled
                class="border p-2 w-full bg-gray-100"
            />
        </label>
        <!-- Contenu -->
        <label>
            Commentaire
            <textarea
                bind:value={comment.content}
                name="content"
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
            <input bind:checked={comment.is_visible} name="is_visible" type="checkbox" />
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
        </div>
    </form>
</section>
