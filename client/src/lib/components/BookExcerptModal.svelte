<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let open = false;
    export let title = "";
    export let text ="";

    const maxLength = 300;
    const dispatch = createEventDispatcher();

    function close(){
        dispatch("close");
    }
</script>

{#if open}
    <!-- Overlay au click dispatch close pôur ferme le modal et changer showModal dans le parent -->
    <div 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
        on:click={close}
    ></div>

    <div
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               bg-bg-main p-6 rounded shadow-lg z-50 w-11/12 max-w-md
               flex flex-col gap-4 "
    >
        <button
            class="absolute top-2 right-2 text-xl"
            on:click={close}
        >
            X
        </button>
        <h2 class="border-b border-accent1 text-center pb-2"> Extrait du livre : { title }</h2>
        <p>
            {text.length > maxLength ? text.slice(0,maxLength) + "..." : text}
        </p>
    </div>
{/if}