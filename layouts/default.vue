<template>
	<div
		class="bg-back bg-fixed min-h-screen bg-no-repeat bg-cover bg-center w-full bg-blend-multiply bg-black/60"
	>
		<Navbar v-if="$route.name !== 'light-id' && $route.name !== 'supply-id'" />
		<Nuxt />
		<Footer v-if="$route.name !== 'light-id' && $route.name !== 'supply-id'" />
		<ToTop v-if="$route.name !== 'light-id' && $route.name !== 'supply-id'" />
	</div>
</template>

<style>
html,
body {
	font-family: "Microsoft JhengHei", "Roboto", sans-serif;
	height: 100%;
	margin: 0;
}
</style>
