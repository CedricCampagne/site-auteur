<script>
	import Button from "./Button.svelte";

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
                <p class="text-center md:text-start">qq lignes sur l'autuer, sa carriere et ses passions pour le thriller. Une biographie captivante pour mieux connaitre l'écrivain</p>
                <Button text="En savoir plus" className="border hover:text-accent2 hover:bg-white transition-all duration-500" />
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
