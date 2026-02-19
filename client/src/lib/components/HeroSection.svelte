<script>
	import { goto } from "$app/navigation";
    import Button from "./Button.svelte";
</script>

<section class="h-100 bg-cover bg-center relative" style="background-image: url('/images/hero.jpg')">
    <div class="absolute inset-0 bg-steel/30"></div>
    <div class="relative z-10 flex flex-col items-start justify-center h-full text-white px-6 text-center gap-4">
        <h1 class="font-title mb-4 text-3xl sm:text-5xl ">« Là où l’esprit se fissure, l’histoire commence »</h1>
        <p class="font-body mb-8 max-w-xl sm:text-lg">Thriller psychologiques par Katia Campagne</p>
        <div class="flex flex-col gap-1 sm:flex sm:flex-row">
            <Button text="Lire un extrait" className="border-2 border-white bg-accent1 hover:text-accent1 hover:bg-white transition:all duration-500" />
            <Button
                text="Découvrir les livres"
                className="border-2 border-white bg-accent2 hover:text-accent2 hover:bg-white transition:all duration-500"
                on:click={()=> goto("/bibliography")}
            />
        </div>
    </div>
</section>

