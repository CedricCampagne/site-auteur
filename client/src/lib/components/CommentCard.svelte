<script lang="ts">
    import { timeAgo } from "$lib/utils/time";
    import type { Comment } from "$lib/types";
    export let comment : Comment;
</script>

<div class="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
    <div class=" gap-3 mb-2 flex flex-row sm:items-center justify-between">
        <div class="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
            <div class="w-10 h-10 rounded-full bg-accent1 text-white flex items-center justify-center font-bold">
                {comment.user.username[0].toUpperCase()}
            </div>
            <p class="font-semibold">
                {comment.user.username}
            </p>
            {#if comment.is_visible === false}
                <span class="text-red-600 font-bold border ml-2 p-1">
                    Masqué
                </span>
            {/if}
        </div>
        <div class="flex flex-col gap-2 ">
            <p class="text-xs text-accent2">
                { new Date(comment.created_at).toLocaleDateString("fr-FR") }
            </p>
            <p class="text-xs text-accent2">
                {timeAgo(comment.created_at)}
            </p>
        </div>
    </div>
    <p class="text-xs sm:text-base text-gray-800 leading-relaxed">
        {comment.content}
    </p>
</div>
