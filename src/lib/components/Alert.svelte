<script lang="ts">
	export let type: 'info' | 'warning' = 'info';

	const colors = {
		info: 'border-teal-500 bg-gray-100 text-teal-900',
		warning: 'border-rose-600 bg-rose-800 text-rose-100'
	};

	const color = colors[type];
</script>

<div class="{color} border-t-8 rounded px-4 py-3 shadow-md my-2" role="alert">
	<div class="flex">
		<div>
			<slot />
		</div>
	</div>
</div>
