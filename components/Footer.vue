<template>
	<div
		class="lg:max-w-[1110px] flex-col lg:flex-row text-[#d5d6d7] mx-auto px-6 py-10 md:px-10 lg:px-0 flex justify-between items-center"
	>
		<div>
			<span
				class="cursor-pointer hover:text-primary-orange mr-4"
				@click="scrollToTop"
				>隱私權政策</span
			>
			<span
				class="cursor-pointer hover:text-primary-orange"
				@click="scrollToTop"
				>使用者條款
			</span>
		</div>
		<div class="mt-2 lg:mt-0">
			Copyright {{ currentYear }}
			<span class="text-primary-orange mx-2"> 高雄市政府工務局 </span> All
			Rights Reserved.
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentYear: "",
		};
	},
	methods: {
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		},
	},
	mounted() {
		this.currentYear = new Date().getFullYear();
	},
};
</script>
