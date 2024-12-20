<template>
	<div class="lg:max-w-[1110px] mx-auto text-white py-36 px-6 md:px-10 lg:px-0">
		<div class="flex justify-start items-center">
			<div class="w-2 h-2 bg-primary-orange mr-4"></div>
			<div class="text-white text-4xl font-bold">{{ title }}</div>
			<div class="w-12 h-1 bg-primary-orange ml-4"></div>
		</div>

		<div
			class="mt-5 text-white text-lg font-semibold tracking-[2px]"
			v-html="editorContent"
		></div>

		<div class="mt-12">
			<iframe
				src="https://www.google.com/maps/d/embed?mid=12tce1WMwB_gKU0t_-bnoLg9d826U2cc&ehbc=2E312F"
				width="100%"
				height="600"
			></iframe>
		</div>
	</div>
</template>

<script>
import { getArticles } from "@/api/main";

export default {
	data() {
		return {
			title: "",
			editorContent: "",
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			getArticles(2).then((res) => {
				this.title = res.data.artileTitle;
				this.editorContent = res.data.articleContent;
			});
		},
	},
};
</script>
