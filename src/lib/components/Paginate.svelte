<script lang="ts">
	export let total: number;
	export let page: number = 0;
	// show 3 before and 3 after current page before using skip markers.
	export let margin = 3;
	let clazz: string | null | undefined = undefined;
	export { clazz as class };

	let pageClass =
		'text-center block border border-gray-500 hover:border-teal-400 text-teal-500 hover:bg-gray-800 py-2 px-6 w-full h-full font-bold text-lg';
</script>

<ul class="{clazz} gap-1 inline-flex">
	{#if page != 0}
		<li>
			<button class={pageClass} on:click={() => (page = 0)}>First</button>
		</li>
	{/if}
	{#if total > 0 && page > 0}
		<li>
			<button class={pageClass} on:click={() => (page -= 1)}>Previous</button>
		</li>
	{/if}

	{#each { length: Math.min(total, margin) + 1 } as _, i}
		{@const reversedIndex = margin - i}
		{#if page - reversedIndex > 0}
			<li>
				<button class={pageClass} on:click={() => (page = page - reversedIndex - 1)}
					>{page - reversedIndex}</button
				>
			</li>
		{/if}
	{/each}
	<li>
		<button class="{pageClass} bg-gray-800">{page + 1}</button>
	</li>
	{#each { length: Math.min(total, margin) + 1 } as _, i}
		{#if page + i < total}
			<li>
				<button class={pageClass} on:click={() => (page = page + i + 1)}>{page + i + 2}</button>
			</li>
		{/if}
	{/each}
	{#if page < total}
		<li>
			<button class={pageClass} on:click={() => (page += 1)}>Next</button>
		</li>
	{/if}
	{#if page < total}
		<li>
			<button class={pageClass} on:click={() => (page = total)}>Last</button>
		</li>
	{/if}
</ul>
