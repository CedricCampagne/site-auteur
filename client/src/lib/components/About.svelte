<script>
	import { goto } from "$app/navigation";
	import Button from "./Button.svelte";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { getInstagramUrl } from "$lib/navigation";

    onMount(() => {
       instagramUrl = getInstagramUrl("katiacampagne")
    });
    
    let instagramUrl ="";
</script>

<section class="flex flex-col items-center bg-accent2 text-white p-6 gap-8 mt-12 md:flex md:flex-row">
    <div class="">
        <img src="/images/cv_photo.jpeg" alt="auteur" class="w-35 md:w-70">
    </div>
    <div class="flex flex-col items-center gap-4 md:flex md:flex-col md:justify-around md:items-start">
        <div>
            <h2 class="text-white text-3xl">A propos</h2>
        </div>
        <div class="w-2/3 flex flex-col gap-8 items-center md:flex md:flex-row md:w-full">
            <div class="flex-1 flex flex-col items-center justify-start gap-4">
                <p class="text-center md:text-start">
                    Depuis toujours, j’explore les univers littéraires. Ce site est né de 
                    l’envie de partager mes lectures, mes analyses et mes coups de cœur. 
                    J’aime comprendre ce qui fait vibrer un texte, ce qui le rend unique.
                </p>
                <div class="flex flex-col items-center gap-2 sm:flex-row">
                    <Button 
                        text="En savoir plus"
                        className="border hover:text-accent2 hover:bg-white transition-all duration-500"
                        on:click = { ()=> goto('about')}
                    />
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon
                            icon="simple-icons:instagram"
                            class=" cursor-pointer text-2xl text-white hover:scale-115 transition-all duration-500"
                        />
                    </a>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-center justify-start gap-4">
                <h3 class="text-xl">Recevez les nouvelles publication</h3>
                    <p>Pas de spam, juste du suspense.</p>
                    <form action="" class="flex flex-col gap-1">
                        <input type="text" placeholder="E-mail" class="bg-white text-black p-1">
                        <button type="submit" class="bg-accent1 p-1 hover:bg-white hover:text-accent1 transition-all duration-500"> S'inscrire</button>
                    </form>
            </div>
        </div>
    </div>
</section>
