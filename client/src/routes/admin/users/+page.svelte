<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { goto } from '$app/navigation';
    import { flash, setFlash } from "$lib/stores/flash";
	import UserAdminCard from '$lib/components/UserAdminCard.svelte';
	import type { User } from '$lib/types.js';

    export let data;
    let users = data.users

    async function deleteUser(id:number){
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            
            if(res.ok){
                users = users.filter((u: User)=> u.id_user !== id);
                setFlash("Supression de l'utilisateur effectuée !!");
            }
        } catch (error) {
             console.error("Erreur lors de la suppresion");
        }
    }

    async function toggleStatus(id: number) {
            try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/users/${id}/toggle`,
                {
                    method: "PATCH",
                    credentials: "include"
                }
            );

            if (res.ok) {
                const updated = await res.json(); 
                // Mise à jour locale comme delete 
                users = users.map((u: User) => u.id_user === id ? updated : u );
                setFlash('Mise a jour du status reussié !');
            } else {
                console.error("Erreur toggle");
            }
        } catch (error) {
            console.error("Erreur toggle");
        }
    }

    async function updateUser(id: number) {
        goto(`/admin/users/${id}/edit`);
    }
    
</script>

<section class="flex flex-col gap-6 mt-24 pb-8 border-b">

    {#if $flash}
        <div class="fixed top-90 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {$flash}
        </div>
    {/if}
    <div class="flex justify-between border-b-2 border-accent2">
        <h2 class="text-5xl font-black text-center mb-4">
            Tous les utilisateurs ({users.length})
        </h2>       
        <Button
        text="Ajouter un utilisateur"
        className="bg-accent1 text-white hover:bg-white hover:text-accent1 transition-all duration-500 self-center border border-accent1"
        on:click={()=> goto("/admin/users/create")}
        />
    </div>
    
    <ul class="space-y-2">
        {#each users as user}
            <UserAdminCard
                {user}
                on:toggle={(e) => toggleStatus(e.detail)}
                on:delete={(e) => deleteUser(e.detail)}
                on:update={(e)=> updateUser(e.detail)}
            />
        {/each}
    </ul>
</section>