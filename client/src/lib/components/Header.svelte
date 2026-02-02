<script>
    import Icon from "@iconify/svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { getInstagramUrl } from "$lib/navigation";

    let isOpen = false;
    let instagramUrl = "";

    onMount(() => {
       instagramUrl = getInstagramUrl("katiacampagne")
    });

</script>

<header class="mb-6">
    <!-- Desktop -->
    <div class="hidden md:flex md:justify-between md:items-center md:p-2">
        <div class="p-2 flex gap-4">
            <span>Katia Campagne</span>
            <div class="relative group hidden md:inline-block">
                <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon
                        icon="simple-icons:instagram"
                        class=" cursor-pointer text-2xl text-accent2 hover:text-accent1 transition-all duration-500"
                    />
                </a>

                <!-- Tooltip -->
                <span
                    class="absolute left-1/2 -translate-x-1/2 mt-2 
                    hidden group-hover:block 
                    whitespace-nowrap
                    bg-black text-white text-xs px-2 py-1 rounded shadow-lg"
                >
                    Peut nécessiter une connexion Instagram
                </span>
            </div>
            
        </div>
        <nav>
          <ul class="flex gap-1">
            <li class="p-2 hover:text-accent1 hover:underline hover:underline-offset-4 transition-all duration-500">
                <a href="/"
                    class={page.url.pathname === "/"
                    ? " text-accent1 font-black"
                    : ""}
                >
                    Accueil
                </a>
            </li>
            <li class="p-2 hover:text-accent1 hover:underline hover:underline-offset-4 transition-all duration-500">
                <a href="/bibliography"
                    class={page.url.pathname === "/bibliography"
                    ? " text-accent1 font-black"
                    : ""}
                >
                    Livres
                </a>
            </li>
            <li class="p-2 hover:text-accent1 hover:underline hover:underline-offset-4 transition-all duration-500">
                <a href="/chronicles"
                class={page.url.pathname === "/chronicles"
                ? " text-accent1 font-black"
                : ""}
                >
                    Chroniques                   
                </a>
            </li>
            <li class="p-2 hover:text-accent1 hover:underline hover:underline-offset-4 transition-all duration-500">
                <a href="/about"
                    class={page.url.pathname === "/about"
                    ? " text-accent1 font-black"
                    : ""}
                >
                    A propos
                </a>
            </li>
            <li class="p-2 hover:text-accent1 hover:underline hover:underline-offset-4 transition-all duration-500">
                <a href="/contact"
                    class={page.url.pathname === "/contact"
                    ? " text-accent1 font-black"
                    : ""}
                >
                    Contact
                </a>
            </li>
          </ul>
        </nav>
        <div class="flex flex-col gap-3">
            <a
                href="/login"
                class="px-4 py-1 rounded-3xl border border-accent1 text-accent1"
            >
                Connexion
            </a>

            <a
                href="/register"
                class="px-4 py-1 rounded-3xl border bg-accent1 text-white"
            >
                Inscription
            </a>
        </div>

    </div>

<!-- Mobile -->
<div class="flex md:hidden justify-around items-center">
    <div class="p-2 flex gap-4">
            <span class="font-black text-xl">Katia Campagne</span>
            <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon
                    icon="simple-icons:instagram"
                    class=" cursor-pointer text-2xl text-accent2 hover:text-accent1 transition-all duration-500"
                />
            </a>
        </div>

    <!-- Bouton toggle -->
    <button on:click={() => (isOpen = !isOpen)}>
      <Icon icon={isOpen ? "ri:close-line" : "ri:menu-line"} class="text-3xl hover:border hover:border-accent1" />
    </button>
</div>
<!-- Menu mobile -->

{#if isOpen}
<nav class="absolute top-9 right-6 z-1000 md:hidden mt-2" on:mouseleave={() => (isOpen = !isOpen)}>
    <ul class="flex flex-col gap-2 p-2 bg-bg-main border rounded-tl-lg rounded-bl-lg shadow">
    <li class="p-2 hover:text-accent1">
        <a href="/"
            class={page.url.pathname === "/"
                ? " text-accent1 font-black"
                : ""}
        >
            Accueil
        </a>
    </li>
    <li class="p-2 hover:text-accent1">
        <a href="/bibliography"
            class={page.url.pathname === "/bibliography"
            ? " text-accent1 font-black"
            : ""}
        >
            Livres
        </a>
    </li>
    <li class="p-2 hover:text-accent1">
        <a href="/chronicles"
            class={page.url.pathname === "/chronicles"
            ? " text-accent1 font-black"
            : ""}
        >
            Chroniques                   
        </a>
    </li>
    <li class="p-2 hover:text-accent1">
        <a href="/about"
            class={page.url.pathname === "/about"
            ? " text-accent1 font-black"
            : ""}
        >
            A propos
        </a>
    </li>
    <li class="p-2 hover:text-accent1">
        <a href="/contact"
            class={page.url.pathname === "/contact"
            ? " text-accent1 font-black"
            : ""}
        >
            Contact
        </a>
    </li>
    <li>
                <div class="flex flex-col gap-3">
            <a
                href="/auth/login"
                class="px-4 py-1 rounded-3xl border border-accent1 text-accent1"
            >
                Connexion
            </a>

            <a
                href="/auth/register"
                class="px-4 py-1 rounded-3xl bg-accent1 text-white"
            >
                Inscription
            </a>
        </div>
    </li>
    </ul>
    </nav>
  {/if}
</header>
