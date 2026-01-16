<script>
    import Icon from "@iconify/svelte";
    import { page } from "$app/state";

    let isOpen = false;
</script>

<header>
    <!-- Desktop -->
    <div class="hidden md:flex md:justify-between md:items-center md:p-2">
        <div class="p-2">Katia Campagne</div>
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
              <li class="p-2 hover:text-accent1 hover:underline hover:underline-offset-4 transition-all duration-500">
                  <Icon icon="ri:moon-fill" class="text-xl" />
              </li>   
          </ul>
        </nav>
        <button
            class="bg-accent1 text-white px-4 rounded-3xl cursor-pointer hover:bg-bg-main hover:text-accent1 hover:border-accent1 transition-all duration-500">Newsletter
        </button>
    </div>

<!-- Mobile -->
<div class="flex md:hidden justify-between items-center">
    <div class="p-2 text-xl font-bold">Katia Campagne</div>

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
    <li class="p-2 hover:text-accent1">
        <Icon icon="ri:moon-fill" class="text-xl" />
    </li>
    <li>
        <button class="bg-accent1 text-white px-4 py-1 rounded-3xl">
        Newsletter
        </button>
    </li>
    </ul>
    </nav>
  {/if}
</header>
