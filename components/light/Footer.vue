<template>
	<div class="flex justify-between items-center bg-[#2b343b] p-4">
		<div>
			<span
				class="cursor-pointer hover:text-primary-blue mr-4 text-gray-300"
				@click="scrollToTop"
				>隱私權政策</span
			>
			<span
				class="cursor-pointer hover:text-primary-blue text-gray-300"
				@click="scrollToTop"
				>使用者條款
			</span>
		</div>
		<div class="mt-2 lg:mt-0 text-gray-300">
			Copyright 2023
			<span class="text-primary-blue mx-2"> 高雄市政府工務局 </span> All Rights
			Reserved.
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		},
	},
};
</script>

