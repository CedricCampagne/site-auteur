<script lang="ts">

    export let comment;
</script>

<div class="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
    <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-full bg-accent1 text-white flex items-center justify-center font-bold">
            {comment.user.username[0].toUpperCase()}
        </div>

        <div>
            <p class="font-semibold">{comment.user.username}</p>
            <p class="text-xs text-accent2">
                { new Date(comment.created_at).toLocaleDateString("fr-FR") }
            </p>
        </div>
    </div>

    <p class="text-gray-800 leading-relaxed">
        {comment.content}
    </p>
</div>
