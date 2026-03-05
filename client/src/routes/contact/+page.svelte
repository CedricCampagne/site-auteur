<script lang="ts">
   import Icon from "@iconify/svelte";
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-5xl font-black text-center mb-4">
        Me Contacter
    </h2>
    <h3 class="text-center mb-16">
        Une question, une remarque ou une demande ? Écrivez-moi.
    </h3>

    <form action="" class="flex flex-col gap-6 items-center">
        <div class="flex flex-col min-w-1/2 relative">
            <label for="name" class="font-title text-title mb-1">Nom :</label>
            <input 
                type="text"
                id="name"
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
        <div class="flex flex-col min-w-1/2">
            <label for="message" class="font-title text-title mb-1">Message :</label>
            <textarea 
                rows="6"
                id="message"
                class="border border-accent2 rounded-md p-3 focus:outline-none focus:border-accent1" >
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


