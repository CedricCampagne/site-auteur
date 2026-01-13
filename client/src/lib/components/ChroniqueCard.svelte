<script>
	import Button from "./Button.svelte";


</script>

<article class="min-w-60 h-80 flex flex-col rounded-xl overflow-hidden bg-white shadow-md border border-accent2">
  <div class="h-1/3 w-full">
    <img
      src="/images/kuru.jpg"
      alt=""
      class="w-full h-full object-cover"
    />
  </div>
  <div class="flex flex-col justify-between flex-1 p-3">
    <div>
      <h3 class="font-title text-lg">Chronique X</h3>
      <p class="text-sm text-text-soft">blablabla .....</p>
    </div>

    <Button text="Lire la chronique" className="bg-accent1 text-white w-full mt-4" />
  </div>
</article>

