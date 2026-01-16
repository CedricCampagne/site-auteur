<script>
	import About from "$lib/components/About.svelte";
	import Bibliography from "$lib/components/Bibliography.svelte";
	import BookExcerptModal from "$lib/components/BookExcerptModal.svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";
	import LastBooks from "$lib/components/LastBooks.svelte";
	import LastChroniques from "$lib/components/LastChroniques.svelte";

	export let data;
	// const { latestBook } = data;
	const latestbook = data.latestbook;
	const allbooks = data.allbooks;
	const latest3Chronicles = data.latest3Chronicles;
	
	let showModal = false;
</script>

<HeroSection/>
<LastBooks
	{ latestbook }
	on:openExcerpt={()=>showModal = true }
/>
<Bibliography { allbooks }/>
<LastChroniques { latest3Chronicles}/>
<About/>

<BookExcerptModal
open={showModal}
text={latestbook.excerpt}
title={latestbook.title}
on:close={()=> showModal = false }
/>