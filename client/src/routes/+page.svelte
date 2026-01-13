<script>
	import About from "$lib/components/About.svelte";
	import Bibliography from "$lib/components/Bibliography.svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";
	import LastBooks from "$lib/components/LastBooks.svelte";
	import LastChroniques from "$lib/components/LastChroniques.svelte";

	export let data;
	
	// const { latestBook } = data;
	const latestbook = data.latestbook;

</script>


<HeroSection />
<LastBooks { latestbook } />
<Bibliography />
<LastChroniques/>
<About/>