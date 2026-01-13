<script lang="ts">
	import type { Chronicle } from "$lib/types";
	import Button from "./Button.svelte";

  export let chronicle: Chronicle;
</script>

<article class="min-w-50 flex flex-col items-center rounded-xl overflow-hidden bg-white shadow-md border border-accent2 text-center">
  <div class="h-1/3 w-full">
    <img
      src={ chronicle.cover_url}
      alt=""
      class="w-full h-full object-cover"
    />
  </div>
  <div class="flex flex-col justify-between items-center flex-1 p-1">
    <div class="flex flex-col items-center gap-4">
      <h3 class="font-title text-lg line-clamp-2">{ chronicle.title}</h3>
      <p class="text-accent1 line-clamp-2">{ chronicle.quote}</p>
    </div>
    <p class="text-sm text-text-soft line-clamp-2">{ chronicle.summary }</p>
    <Button text="Lire la chronique" className="bg-accent1 text-white w-2/3 mt-4" />
  </div>
</article>

