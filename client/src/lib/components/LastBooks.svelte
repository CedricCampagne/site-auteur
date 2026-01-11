<script>
	import Button from "./Button.svelte";
</script>

<section class="bg-bg-main p-6">
    <h2 class="text-title text-2xl mb-2">Dernier livre publié</h2>
    <div class="flex gap-4">
        <img src="/images/kuru.jpg" alt="couverture livre kuru" class="w-32 h-auto object-contain">
        <div>
            <h2 class="text-title text-2xl mb-2">Titre du livre</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, vero unde.
                Repellendus error dolore sed quis suscipit aliquid veniam corporis assumenda,
                non alias officiis hic doloribus incidunt blanditiis inventore architecto.
            </p>
            <div class="mt-8">
                <Button text="Lire un extrait" className="border-2 border-accent2" />
                <Button text="Voir la fiche complete" className="border-2 border-accent2" />
        </div>
        </div>
    </div>
</section>