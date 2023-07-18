<script lang="ts">
	let clazz: string = '';
	export { clazz as class };
</script>

<div class="w-full rounded overflow-hidden shadow-md bg-gray-700 {clazz || ''}">
	<slot />
</div>
