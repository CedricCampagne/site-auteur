<script lang="ts">
	import { goto } from "$app/navigation";
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";

    let title = "";
    let quote = "";
    let summary = "";
    let content = "";
    let cover_url = "";
    let published_at = "";
    let is_active = true;

    // Validation automatique
    $: titleError = title.trim().length < 3 ? "Le titre doit faire au moins 3 caractères." : "";
    $: quoteError = quote.trim().length < 10 ? "La citation doit faire au moins 10 caractères." : "";
    $: summaryError = summary.trim().length < 20 ? "Le résumé doit faire au moins 20 caractères." : "";
    $: contentError = content.trim().length < 50 ? "Le contenu doit faire au moins 50 caractères." : "";
    $: urlError = !cover_url.startsWith("http") ? "L’URL doit commencer par http." : "";
    $: dateError = !published_at ? "La date est obligatoire." : "";

    // Form valid si aucune erreur
    $: isFormValid =
        !titleError &&
        !quoteError &&
        !summaryError &&
        !contentError &&
        !urlError &&
        !dateError;

    let successMessage = "";
    let errorMessage = "";

    async function handleSubmit() {
        try {

            if (!title.trim()) {
                errorMessage = "Le titre est obligatoire";
                return;
            }
            
            if (summary.length < 10) {
                errorMessage = "Le résumé doit faire au moins 10 caractères";
                return;
            }

            if (content.length < 20) {
                errorMessage = "Le contenu est trop court";
                return;
            }

            if (!cover_url.startsWith("http")) {
                errorMessage = "L’URL de l’image est invalide";
                return;
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/chronicles`,{
                method: "POST",
                headers: {"Content-Type": "application/json" },
                credentials:"include",
                body: JSON.stringify({
                    title,
                    quote,
                    summary,
                    content,
                    cover_url,
                    published_at,
                    is_active
                })
            });
    
            if(!res.ok){
                const err = await res.json();
                errorMessage = err.error || "Erreur lors de la création";
                return;
            }
            
            successMessage = "Chronique créée avec succes !";

            title= "";
            quote= "";
            summary= "";
            content= "";
            cover_url= "";
            published_at= "";
            is_active= true;

            setTimeout(()=>goto("/admin/chronicles"),3000)

        } catch (err) {
            errorMessage = "Erreur Serveur";
        }
    }
    
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-4xl font-black text-center mb-4">Création d'une chronique</h2>

    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4" >
        
        <label>
            Titre
            <input bind:value={title} type="text" class="border p-2 w-full" />
            <div class="h-10 py-2">
                {#if titleError}<p class="text-accent1">{titleError}</p>{/if}
            </div>
        </label>

        <label>
            Citation
            <textarea bind:value={quote} rows="2" class="border p-2 w-full"></textarea>
            <div class="h-10 py-2">
                {#if quoteError}<p class="text-accent1">{quoteError}</p>{/if}
            </div>
        </label>

        <label>
            Résumé
            <textarea bind:value={summary}  rows="3" class="border p-2 w-full"></textarea>
            <div class="h-10 py-2">
                {#if summaryError}<p class="text-accent1">{summaryError}</p>{/if}
            </div>
        </label>

        <label>
            Contenu (Markdown)
            <MarkdownEditor
                value={content}
                onChange={(v) => content = v}
            />
            <div class="h-10 py-2">
                {#if contentError}<p class="text-accent1">{contentError}</p>{/if}
            </div>
        </label>

        <label>
            URL de l’image
            <input bind:value={cover_url} type="text" class="border p-2 w-full" />
            <div class="h-10 py-2">
                {#if urlError}<p class="text-accent1">{urlError}</p>{/if}
            </div>
        </label>

        <label>
            Date de publication :
            <input bind:value={published_at} type="date" class="border p-2 w-full" />
            <div class="h-10 py-2 ">
                {#if dateError}<p class="text-accent1">{dateError}</p>{/if}
            </div>
        </label>

        <label class="flex items-center gap-2">
            <input bind:checked={is_active} type="checkbox"/>
            Activer la chronique
        </label>

        <div class="flex items-center gap-6">
            <button
                type="submit"
                class="max-w-50 bg-accent2 text-white px-4 py-2 rounded hover:bg-accent1 transition-all duration-500"
                disabled={!isFormValid}
            >
                Créer la chronique
            </button>

            {#if successMessage}
                <p class="bg-green-600 text-white font-semibold p-2 rounded-xs">{successMessage}</p>
            {/if}

            {#if errorMessage}
                <p class="bg-red-700 text-white font-semibold p-2 rounded-xs">{errorMessage}</p>
            {/if}
        </div>
    </form>
</section>




