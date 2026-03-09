<script>
	import About from "$lib/components/About.svelte";
	import Bibliography from "$lib/components/Bibliography.svelte";
	import BookExcerptModal from "$lib/components/BookExcerptModal.svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";
	import LastBooks from "$lib/components/LastBooks.svelte";
	import LastChroniques from "$lib/components/LastChronicles.svelte";

	export let data;
	const latestbook = data.latestbook;
	const allbooks = data.allbooks;
	const latest3Chronicles = data.latest3Chronicles;
	
	let showModal = false;
	let excerpt = "";
	let excerptTitle = "";

	function pickRandomExcerpt(){
		if(!allbooks || allbooks.length === 0) {
			return;
		}

		const randomBook = allbooks[Math.floor(Math.random() * allbooks.length)];
		excerpt = randomBook.excerpt;
		excerptTitle = randomBook.title;

		showModal = true;
	}

</script>

<HeroSection
	on:randomExerpt= { pickRandomExcerpt }
/>
<LastBooks
	{ latestbook }
	on:openExcerpt={()=>showModal = true }
/>
<Bibliography { allbooks }/>
<LastChroniques { latest3Chronicles}/>
<About/>

<BookExcerptModal
	open={showModal}
	text={excerpt}
	title={excerptTitle}
	on:close={()=> showModal = false }
/>