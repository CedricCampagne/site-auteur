<script>
	import { goto } from "$app/navigation";
	import Button from "./Button.svelte";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { getInstagramUrl } from "$lib/navigation";
	import NewsletterForm from "./NewsletterForm.svelte";

    onMount(() => {
       instagramUrl = getInstagramUrl("katiacampagne")
    });
    
    let instagramUrl ="";
</script>

<section class="flex flex-col items-center bg-accent2 text-white p-6 gap-8 mt-12 md:flex md:flex-row">
    <div class="shrink-0">
        <img src="/images/cv_photo.jpeg" alt="auteur" class="w-50 md:w-70">
    </div>
    <div class="flex flex-col items-center gap-4 md:flex md:flex-col md:justify-around md:items-start">
        <div>
        </div>
        <div class="w-2/3 flex flex-col gap-8 items-center md:flex md:flex-row md:items-start md:w-full">
            <div class="flex-1 flex flex-col items-center justify-start gap-4">
                <div class="flex flex-col items-center gap-4">
                    <h2 class="text-white text-3xl">A propos</h2>
                    <p class="text-center md:text-start">
                        Depuis toujours, j’explore les univers littéraires. Ce site est né de 
                        l’envie de partager mes lectures, mes analyses et mes coups de cœur. 
                        J’aime comprendre ce qui fait vibrer un texte, ce qui le rend unique.
                    </p>
                    <div class="flex flex-col items-center gap-4">
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
            </div>
            <div class="flex-1 flex flex-col items-center justify-start gap-4 text-center">
                <h3 class="text-xl">Recevez les nouvelles publications</h3>
                    <p>Pas de spam, juste du suspense.</p>
                    <NewsletterForm />
            </div>
        </div>
    </div>
</section>

<!-- <section class="flex flex-col items-center bg-accent2 text-white p-12 gap-16 mt-12 md:flex-row md:items-start md:justify-center">
    
   
    <div class="flex-shrink-0">
        <img src="/images/cv_photo.jpeg" alt="auteur" class="w-35 md:w-70 rounded">
    </div>

   
    <div class="flex flex-col gap-16 w-full max-w-3xl md:flex-row md:items-start">

        
        <div class="flex-1 flex flex-col gap-6 md:items-start text-center md:text-left">
            <h2 class="text-white text-3xl">À propos</h2>
            <p class="leading-relaxed">
                Depuis toujours, j’explore les univers littéraires. Ce site est né de 
                l’envie de partager mes lectures, mes analyses et mes coups de cœur. 
                J’aime comprendre ce qui fait vibrer un texte, ce qui le rend unique.
            </p>

            <div class="flex flex-col items-center gap-4 sm:flex-row md:items-start">
                <Button 
                    text="En savoir plus"
                    className="border hover:text-accent2 hover:bg-white transition-all duration-500"
                    on:click={() => goto('about')}
                />
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                    <Icon
                        icon="simple-icons:instagram"
                        class="cursor-pointer text-2xl text-white hover:scale-115 transition-all duration-500"
                    />
                </a>
            </div>
        </div>

       
        <div class="flex-1 flex flex-col gap-6 md:items-start text-center md:text-left">
            <h3 class="text-xl">Recevez les nouvelles publications</h3>
            <p class="leading-relaxed">Pas de spam, juste du suspense.</p>
            <NewsletterForm />
        </div>

    </div>
</section> -->
