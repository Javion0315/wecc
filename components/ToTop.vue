<template>
	<div class="fixed bottom-6 right-6">
		<div
			@click="scrollToTop"
			class="bg-[#16171d] cursor-pointer hover:bg-primary-orange w-12 h-12 text-white rounded-full flex justify-center items-center"
		>
			<font-awesome-icon class="text-xl" :icon="['fas', 'chevron-up']" />
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	methods: {
		handleScroll() {
			if (window.scrollY > 100) {
				this.$el.style.display = "block";
			} else {
				this.$el.style.display = "none";
			}
		},
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		},
	},
};
</script>
