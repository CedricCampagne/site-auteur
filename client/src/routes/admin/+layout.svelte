
<script lang="ts">
    import { page } from '$app/state'
</script>

<section class="flex flex-col gap-6 mt-24 pb-8 border-b">
    <div class="border-b-2 border-accent2">
        <h2 class="text-4xl sm:text-5xl font-black text-center mb-4">
            Administration du site
        </h2>
    </div>
    <!-- Menu nav -->
    <nav class="bg-gray-100 border-b">
        <ul class="flex flex-col gap-4 items-center sm:flex-row sm:justify-center sm:gap-16 py-4 text-lg font-medium">
            <li>
                <a 
                    href="/admin/chronicles" 
                    class={
                            page.url.pathname.startsWith('/admin/chronicles')
                            ? "px-4 py-2 text-accent1 font-bold"
                            : "px-4 py-2 hover:text-accent1 hover:underline underline-offset-4"
                        }
                >
                    Chroniques
                </a>
            </li>
            <li>
                <a 
                    href="/admin/comments" 
                    class={
                            page.url.pathname.startsWith('/admin/comments')
                            ? "px-4 py-2 text-accent1 font-bold"
                            : "px-4 py-2 hover:text-accent1 hover:underline underline-offset-4"
                        }
                >
                    Commentaires
                </a>
            </li>
            <li>
                <a 
                    href="/admin/users" 
                    class={
                            page.url.pathname.startsWith('/admin/users')
                            ? "px-4 py-2 text-accent1 font-bold"
                            : "px-4 py-2 hover:text-accent1 hover:underline underline-offset-4"
                        }
                >
                    Utilisateurs
                </a>
            </li>
        </ul>
    </nav>

    <!-- Contenu dynamique -->
    <main class="flex-1 p-6">
        <slot />
    </main>
</section>
