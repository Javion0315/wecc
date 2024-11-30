<template>
	<div
		class="w-full lg:w-[calc(100%-200px)] h-20 bg-black/80 py-4 fixed top-0 px-4 z-10"
	>
		<div class="flex justify-between items-center">
			<div class="flex items-center">
				<div
					class="text-primary-blue px-3 py-2 mr-2 flex justify-center items-center lg:hidden cursor-pointer"
					@click="$emit('open-sidebar')"
				>
					<font-awesome-icon class="text-3xl" :icon="['fas', 'bars']" />
				</div>
				<div
					class="cursor-pointer"
					@click="$router.push({ path: '/' }), (actived = 'index')"
				>
					<img class="w-[200px]" src="/logo.png" alt="logo" />
				</div>
			</div>

			<div
				class="text-white flex flex-col lg:flex-row items-end text-sm md:text-base"
			>
				現在時間 :
				<span class="font-bold text-sm md:text-xl text-primary-blue ml-2">{{
					time
				}}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			time: "",
		};
	},
	mounted() {
		this.setTime();
		setInterval(() => {
			this.setTime();
		}, 1000);
	},
	methods: {
		setTime() {
			let myDate = new Date();
			const h = myDate.getHours();
			const m =
				myDate.getMinutes() < 10
					? "0" + myDate.getMinutes()
					: myDate.getMinutes();
			const s =
				myDate.getSeconds() < 10
					? "0" + myDate.getSeconds()
					: myDate.getSeconds();
			const time = h + ":" + m + ":" + s;

			this.time = time;
		},
	},
};
</script>
