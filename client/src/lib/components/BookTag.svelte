<script lang="ts">
    export let text = "Tag";
    export let className = "";

</script>

<span
    class={` border rounded-xl px-4 py-1 ${className}`}
>
    {text}
</span>