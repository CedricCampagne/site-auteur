<script>
	import Button from "./Button.svelte";

</script>

<section class="bg-accent2 text-white p-6 flex gap-8">
    <div>
        <img src="/images/cv_photo.jpeg" alt="auteur" class="w-80 h-auto object-contain">
    </div>
    <div class="grid grid-rows-[1fr_2fr] grid-cols-2 gap-2">
        <h2 class="text-white text-3xl mb-2 col-span-2">A propos</h2>
        <div class="border-t flex flex-col justify-around">
            <p>qq lignes sur l'autuer, sa carriere et ses passions pour le thriller. Une biographie captivante pour mieux connaitre l'écrivain</p>
            <Button text="En savoir plus" />
        </div>
        <div class="border-t flex flex-col justify-around">
            <h3 class="text-xl">Recevez les nouvelles publication</h3>
                <p>Pas de spam, juste du suspense.</p>
                <form action="">
                    <input type="text" placeholder="E-mail" class="bg-white text-black p-1">
                    <button type="submit" class="bg-accent1 p-1"> S'inscrire</button>
                </form>
        </div>
    </div>
</section>
