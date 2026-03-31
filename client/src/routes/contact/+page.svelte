<script lang="ts">
    import Icon from "@iconify/svelte";
    import { fade } from "svelte/transition";

    let successMessage = "";
    let errorMessage = "";

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const nameInput = form.querySelector('#name') as HTMLInputElement;
        const emailInput = form.querySelector('#email') as HTMLInputElement;
        const subjectInput = form.querySelector('#subject') as HTMLInputElement;
        const messageInput = form.querySelector('#message') as HTMLTextAreaElement;

        const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        const res = await fetch("https://formspree.io/f/mojpwwdj", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            successMessage = "Votre message a bien été envoyé !";
            errorMessage = "";
            form.reset();
            setTimeout(() => successMessage = "", 4000);
        } else {
            errorMessage = "Une erreur est survenue. Veuillez réessayer.";
            successMessage = "";
        }
    }
</script>


<svelte:head>
    <title>Contact – Katia Campagne</title>
    <meta 
        name="description" 
        content="Contactez Katia Campagne pour toute question, remarque ou demande concernant ses livres, ses chroniques ou son univers littéraire." 
    />
</svelte:head>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-5xl font-black text-center mb-4">
        Me Contacter
    </h2>
    <h3 class="text-center mb-16">
        Une question, une remarque ou une demande ? Écrivez-moi.
    </h3>

    {#if successMessage}
        <p
            class="text-white bg-green-600 px-4 py-2 rounded-lg text-center shadow-md"
            transition:fade={{ duration: 300 }}
        >
            {successMessage}
        </p>
    {/if}

    {#if errorMessage}
        <p
            class="text-white bg-red-600 px-4 py-2 rounded-lg text-center shadow-md"
            transition:fade={{ duration: 300 }}
        >
            {errorMessage}
        </p>
    {/if}
    
    <form
        id="contactForm"
        class="flex flex-col gap-6 items-center"
        on:submit={handleSubmit}
    >
        <div class="flex flex-col min-w-1/2 relative">
            <label for="name" class="font-title text-title mb-1">Nom :</label>
            <input 
                type="text"
                id="name"
                name="name"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent2 peer"
                placeholder=""
            >
            <div class="absolute top-10 right-4 flex items-center gap-2 transition-opacity duration-500 peer-placeholder-shown:opacity-100 opacity-0" >
                <span class="text-sm text-accent1">
                    Saisir votre Nom
                </span>
                <Icon icon="maki:cross" class="text-2xl text-accent1" />
            </div>
        </div>
        <div class="flex flex-col min-w-1/2 relative">
            <label for="email" class="font-title text-title mb-1">Email :</label>
            <input 
                type="email"
                id="email"
                name="email"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent2 peer"
                placeholder=""
            >
            <div class="absolute top-10 right-4 flex items-center gap-2 transition-opacity duration-200 peer-placeholder-shown:opacity-100 opacity-0" >
                <span class="text-sm text-accent1">
                    Saisir votre Email
                </span>
                <Icon icon="maki:cross" class="text-2xl text-accent1" />
            </div>
        </div>
        <div class="flex flex-col min-w-1/2 relative">
            <label for="subject" class="font-title text-title mb-1">Sujet :</label>
            <input 
                type="text"
                id="subject"
                name="subject"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent2 peer"
                placeholder=""
            >
            <div class="absolute top-10 right-4 flex items-center gap-2 transition-opacity duration-500 peer-placeholder-shown:opacity-100 opacity-0" >
                <span class="text-sm text-accent1">
                    Saisir le Sujet
                </span>
                <Icon icon="maki:cross" class="text-2xl text-accent1" />
            </div>
        </div>
        <div class="flex flex-col min-w-1/2">
            <label for="message" class="font-title text-title mb-1">Message :</label>
            <textarea 
                rows="6"
                id="message"
                name="message"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent1"
            >
            </textarea>
        </div>
        <button
            type="submit"
            class=" text-white bg-accent2 p-2 rounded-md min-w-1/4 hover:bg-accent1 transition-all duration-500"
        >
            Envoyer
        </button>
    </form>
</section>


