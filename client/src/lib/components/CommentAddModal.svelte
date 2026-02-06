<script lang="ts">
      import { createEventDispatcher } from "svelte";

    export let open = false;

    const maxLength = 300;
    const dispatch = createEventDispatcher();

    function close(){
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
        class="flex flex-col items-center gap-4"
        >
            <legend class="border-b-2 border-accent1">Ajouter votre commentaire</legend>
            <textarea name="comment" id="comment" rows="8" cols="30" class="border-2 p-2"></textarea>
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