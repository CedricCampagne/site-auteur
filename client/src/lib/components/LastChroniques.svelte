<script>
	import BookCard from "./BookCard.svelte";
	import ChroniqueCard from "./ChroniqueCard.svelte";


</script>

<section class="bg-bg-main p-6 mt-8 mx-15 flex flex-col gap-6 border-b border-accent2">
    <h2 class="text-title text-2xl mb-2">Dernières chroniques</h2>
    <div class="flex gap-3">
       <ChroniqueCard/>
       <ChroniqueCard/>
       <ChroniqueCard/>
    </div>
</section>