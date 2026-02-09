<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { enhance } from "$app/forms";

    export let open = false;

    let content= "";
    let error = "";

    const minLength = 5;
    const maxLength = 1000;

    async function handleSubmit(event : SubmitEvent){
        event.preventDefault();
        error= "";

        const trimmed = content.trim();

        if(trimmed.length === 0){
            error = "Le commentaire ne peut pas etre vide";
            return
        }

        if(trimmed.length < minLength){
            error = `Le commentaire doit contenir au moins ${minLength} caractères.`
            return
        }

        if(trimmed.length > maxLength){
            error = `Le commentaire ne doit pas dépasser ${maxLength} caractères.`
            return
        }

        // Si tout est OK => soumission du formulaire
        const form = event.target as HTMLFormElement;
        form.submit();
    }

    const dispatch = createEventDispatcher();

    function close(){
        content="";
        error="";
        dispatch("close");
    }

</script>
{#if open}
<!-- inset-0 => top: 0; right: 0; bottom: 0; left: 0; -->
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
    <!-- bouton invisible pour capter le click -->
    <button
        class="absolute inset-0 w-full h-full"
        on:click={close}
        aria-label="Fermer le modal"
    ></button>
</div>
<div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-bg-main p-6 rounded shadow-lg z-50 w-11/12 max-w-md
            flex flex-col gap-4 "
    
    >
    <form
        method="POST"
        on:submit={handleSubmit}
        use:enhance={async ({ result }: any) => {
            if (result.type === "success") {
                // on prévient la page qu’un commentaire a été créé
                dispatch("created", { comment: result.data.comment });
                close();
            }

            if (result.type === "failure") {
                error = result.data.error ?? "Erreur lors de la création du commentaire.";
            }
        }}
        class="flex flex-col items-center gap-4"
        >
            <legend class="border-b-2 border-accent1">Ajouter votre commentaire</legend>
            <textarea
                name="comment"
                id="comment"
                rows="8" cols="30"
                class="border p-2"
                bind:value={content}
            >
            </textarea>
            <div class="min-h-5">
                {#if error}
                    <p class="text-red-500 text-sm">{error}</p>
                {/if}
            </div>
            <div>
                <button class="bg-accent1 text-white p-2 rounded-xs">Valider</button>
                <button
                type="button"
                class="bg-accent2 text-white p-2 rounded-xs"
                on:click={close}
                >
                    Annuler
                </button>
            </div>
    </form>
</div>
{/if}