<script lang="ts">
    import { onMount } from "svelte";

    export let value = "";
    export let onChange: (value: string) => void = () => {};

    let textarea:  HTMLTextAreaElement;
    let editor: any;

    onMount(async () => {
        const EasyMDE = (await import("easymde")).default;

        editor = new EasyMDE({
            element: textarea,
            initialValue: value,
            spellChecker: false,
            minHeight: "300px",
            status: false
        });

        editor.codemirror.on("change", () => {
            onChange(editor.value());
        });
    });
</script>

<textarea bind:this={textarea}></textarea>

<style>
    @import "easymde/dist/easymde.min.css";
</style>
