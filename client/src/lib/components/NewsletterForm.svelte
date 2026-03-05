<script lang="ts">
    let email = "";
    let success = false;
    let error = false;

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        success = false;
        error = false;

        const formData = new FormData();
        formData.append("EMAIL", email);
        formData.append("email_address_check", "");
        formData.append("locale", "fr");
        formData.append("html_type", "simple");

        try {
            const res = await fetch(
                "https://80e02d47.sibforms.com/serve/MUIFAOQ47ZzRVpAzUkO0U2SxOGKphWd5mZu7kVjAAjafths-ri1og1sVZtjpC-wB15STzgYSznTegaCd9hYGavGTdtTdP-T1sTp4FS6ON_4Sd3L9EllEneFpaNHNNs8Glj6-IeyM2f5ZSIq6YT97ZxtQwvPTfSCVQrKWHTxTGcCV6qRumFZn1HR6IomF3MMNrK5UX1fRoDCdDoELcg==",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (res.ok) {
                success = true;
                email = "";
            } else {
                error = true;
            }
        } catch (err) {
            error = true;
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2 w-full max-w-sm">
    <input
        type="email"
        bind:value={email}
        placeholder="Votre e-mail"
        required
        class="bg-white text-black p-2 rounded border border-gray-300 focus:border-accent1 focus:ring-0 outline-none"
    />
    <button
        type="submit"
        class="bg-accent1 text-white p-2 rounded hover:bg-white hover:text-accent1 border border-accent1 transition-all duration-500"
    >
        S'inscrire
    </button>
</form>

<div class="min-h-7.5 mt-2">
    {#if success}
        <p class="text-green-600">
            Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.
        </p>
    {/if}
    {#if error}
        <p class="text-red-600">
            Une erreur est survenue. Veuillez réessayer.
        </p>
    {/if}
</div>

