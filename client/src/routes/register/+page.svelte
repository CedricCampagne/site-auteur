<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let form;

    onMount(() => {
        if (form?.success) {
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        }
    });
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-5xl font-black text-center mb-4">
        Créer votre compte
    </h2>

    <form
        method="POST"
        class="flex flex-col gap-6 items-center"
    >
        <div class="h-8 flex items-center">
            {#if form?.error}
                <p
                    class="text-center text-white bg-accent1 rounded-2xl py-1 px-2"
                    transition:fade={{duration:400}}
                >
                    {form.error}
                </p>
            {/if}
            {#if form?.success}
                <p
                    class="text-center text-white bg-green-600 rounded-2xl py-1 px-2"
                    transition:fade={{ duration: 400 }}
                >
                    {form.success}
                </p>
            {/if}   
        </div>
        
        <div class="flex flex-col min-w-1/2 relative">
            <label for="username" class="font-title text-title mb-1">Nom :</label>
            <input 
                type="text"
                id="username"
                name="username"
                value={form?.values?.username ?? ""}
                autocomplete="username"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent2 peer"
            >
             <div class="absolute top-10 right-4 flex items-center gap-2 transition-opacity duration-500 peer-placeholder-shown:opacity-100 opacity-0" >
                <span class="text-sm text-accent1">Saisir votre Nom</span>
                <Icon icon="maki:cross" class="text-2xl text-accent1" />
            </div>
        </div>
        <div class="flex flex-col min-w-1/2 relative">
            <label for="email" class="font-title text-title mb-1">Email :</label>
            <input 
                type="email"
                id="email"
                name="email"
                value={form?.values?.email ?? ""}
                autocomplete="email"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent2 peer"
            >
            <div class="absolute top-10 right-4 flex items-center gap-2 transition-opacity duration-200 peer-placeholder-shown:opacity-100 opacity-0" >
                <span class="text-sm text-accent1">Saisir votre Email</span>
                <Icon icon="maki:cross" class="text-2xl text-accent1" />
            </div>
        </div>
        <div class="flex flex-col min-w-1/2 relative">
            <label for="password" class="font-title text-title mb-1">Mot de passe :</label>
            <input 
                type="password"
                id="password"
                name="password"
                autocomplete="new-password"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent2 peer"
            >
            <div class="absolute top-10 right-4 flex items-center gap-2 transition-opacity duration-200 peer-placeholder-shown:opacity-100 opacity-0" >
                <span class="text-sm text-accent1">Saisir un mot de passe</span>
                <Icon icon="maki:cross" class="text-2xl text-accent1" />
            </div>
        </div>
        <div class="flex flex-col min-w-1/2 relative">
            <label for="confirm" class="font-title text-title mb-1">Confirmation :</label>
            <input 
                type="password"
                id="confirm"
                name="confirm"
                autocomplete="new-password"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent2 peer"
            >
            <div class="absolute top-10 right-4 flex items-center gap-2 transition-opacity duration-200 peer-placeholder-shown:opacity-100 opacity-0" >
                <span class="text-sm text-accent1">Confirmer votre mot de passe</span>
                <Icon icon="maki:cross" class="text-2xl text-accent1" />
            </div>
        </div>

        <button
            type="submit"
            class="text-white bg-accent2 p-2 rounded-md min-w-1/2 hover:bg-accent1 transition-all duration-500"
        >
            S'Inscrire
        </button>
    </form>
</section>