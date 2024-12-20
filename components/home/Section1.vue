<template>
	<div
		class="lg:max-w-[1110px] mx-auto text-white pb-36 pt-40 lg:pt-64 px-6 md:px-10 lg:px-0"
	>
		<CommonLoading v-if="isLoading" />
		<h1 class="mb-5 tracking-[12px] text-5xl">{{ title }}</h1>
		<div
			class="text-lg tracking-[2px] font-semibold"
			v-html="editorContent"
		></div>
	</div>
</template>

<script>
import { getArticles } from "@/api/main";

export default {
	data() {
		return {
			isLoading: false,
			title: "",
			editorContent: "",
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.isLoading = true;
			getArticles(1)
				.then((res) => {
					this.title = res.data.artileTitle;
					this.editorContent = res.data.articleContent;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
