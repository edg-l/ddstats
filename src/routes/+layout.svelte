<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>DDStats</title>
	<meta name="description" content="View DDNet / Teeworlds Statistics." />
	<meta name="author" content="Ryozuki" />
	<meta property="og:site_name" content="DDStats" />
</svelte:head>

<nav class="flex items-center justify-between flex-wrap bg-gray-900 p-4 mb-4">
	<div class="flex items-center flex-shrink-0 mr-6">
		<a href="/"><img src="/logo/Horizontal/DDStats_Horizontal.svg" width="200px" alt="DDStats" /></a>
	</div>
	<div class="flex-grow flex items-center">
		<div class="text-sm flex-grow">
			<!--
			<a href="/search" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Search</a>
			<a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"> Examples </a>
			<a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"> Blog </a>
			-->
		</div>

		<div>
			<a href="/status" class="inline-block mt-0 text-gray-200 hover:text-white mr-4">Status</a>
			<a href="/players" class="inline-block mt-0 text-gray-200 hover:text-white mr-4">Players</a>
			<a href="https://db.ddstats.org" class="inline-block mt-0 text-gray-200 hover:text-white mr-4">Datasette</a>
		</div>
	</div>
</nav>

<slot />

<footer class="md:container mx-auto flex my-4 flex-col justify-center w-full px-4 py-2">
	<p class="text-muted text-center font-bold">
		&copy; 2023 <a class="text-teal-400 font-bold" href="/">ddstats.org</a>
	</p>
	<p class="text-muted text-center mt-4">
		Content Released Under
		<a class="text-teal-400 font-bold" href="https://creativecommons.org/licenses/by-sa/4.0/">
			Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
		</a>
	</p>
	<p class="text-muted text-center mt-4">
		Code Released under AGPL-3, you can find the source code
		<a class="text-teal-400 font-bold" href="https://github.com/edg-l/ddstats">here</a>.
	</p>
</footer>
