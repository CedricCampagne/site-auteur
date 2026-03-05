<script lang="ts">
    import type { Chronicle } from "$lib/types";
	import Button from "./Button.svelte";
    import { getChronicleUrl } from "$lib/navigation";
    import { goto } from "$app/navigation";

    export let chronicle: Chronicle;

    function goToChronicle(){
        goto (getChronicleUrl(chronicle));
    }
</script>

<article class="flex flex-col overflow-hidden bg-white shadow-lg shadow-accent2 h-112 w-3/4">
    <!-- IMAGE verrouillée -->
    <!-- basis-1/3 prend exactement 33% de la hauteur du <article> -->
    <div class="relative basis-1/3 shrink-0">
        <!-- absolute inset-0 le div interne couvre 100% du parent en relative -->
        <div class="absolute inset-0">
            <img
                src={chronicle.cover_url}
                alt={`Couverture de ${chronicle.title}`}
                class="w-full h-full object-cover"
            />
        </div>
    </div>
    <!-- TEXTE -->
    <div class="basis-2/3 flex flex-col justify-between items-center p-4 overflow-hidden">
        <h3 class="font-title text-lg line-clamp-2">
            {chronicle.title}
        </h3>
        <p class="text-accent1 line-clamp-2 text-center">
            {chronicle.quote}
        </p>
        <p class="text-sm text-text-soft line-clamp-2 text-center">
            {chronicle.summary}
        </p>
        <Button 
            text="Lire la chronique"
            className="text-sm border-2 bg-white text-accent2 hover:bg-accent2 hover:text-white transition-all duration-500"
            on:click={()=>goToChronicle()}
        />
    </div>
</article>


