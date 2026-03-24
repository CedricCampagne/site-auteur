<script>
    export let text = "Bouton"
    export let className = ""
</script>

<button 
    on:click
    class={`px-4 py-1 rounded-xs cursor-pointer ${className}`}
>
    {text}
</button>