<template>
	<div class="lg:max-w-[1110px] mx-auto text-white py-36 px-6 md:px-10 lg:px-0">
		<div class="flex justify-start items-center">
			<div class="w-2 h-2 bg-primary-orange mr-4"></div>
			<div class="text-white text-4xl font-bold">{{ title }}</div>
			<div class="w-12 h-1 bg-primary-orange ml-4"></div>
		</div>

		<div
			class="mt-5 text-white text-lg font-semibold tracking-[2px] mb-10"
			v-html="editorContent"
		></div>

		<carousel
			:per-page="displayCount"
			:autoplay="true"
			:loop="true"
			:min-swipe-distance="1"
			:scrollPerPage="false"
			:speed="800"
			:pagination-enabled="false"
		>
			<slide v-for="(item, index) in list" :key="index">
				<div
					class="w-full cursor-pointer max-w-xs md:max-w-[250px] shadow-lg rounded-lg overflow-hidden"
					@click="
						$router.push({
							name: 'supply-id',
							params: { id: item.buildingCode },
						}),
							saveImgName(formatImg(item.buildingImage), item.buildingName)
					"
				>
					<img
						:src="formatImg(item.buildingImage)"
						:alt="item.buildingName"
						class="w-full h-[320px] object-cover"
					/>

					<div class="px-4 py-3 bg-black/70 text-white relative">
						<h3 class="text-lg font-medium">
							{{ item.buildingName }}
						</h3>
					</div>
				</div>
			</slide>
		</carousel>
	</div>
</template>


<script>
import { getIndexSmartSupply, getArticles } from "@/api/main";
import { Carousel, Slide } from "vue-carousel";

export default {
	name: "program",
	data() {
		return {
			currentIndex: 0,
			displayCount: 4,
			list: [],
			title: "",
			editorContent: "",
		};
	},
	components: {
		Carousel,
		Slide,
	},
	mounted() {
		// 響應式調整顯示數量
		this.updateDisplayCount();
		window.addEventListener("resize", this.updateDisplayCount);
		this.getData();
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updateDisplayCount);
	},
	methods: {
		updateDisplayCount() {
			const width = window.innerWidth;
			if (width < 640) {
				this.displayCount = 1; // 手機
			} else if (width < 1024) {
				this.displayCount = 3; // 平板
			} else {
				this.displayCount = 4; // 電腦
			}
		},
		getData() {
			getArticles(4).then((res) => {
				this.title = res.data.artileTitle;
				this.editorContent = res.data.articleContent;
			});

			getIndexSmartSupply()
				.then((res) => {
					this.list = res.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		formatImg(url) {
			// const BaseUrl = "http://yang332904.synology.me:8080/";
			const BaseUrl = "https://wecc.elfbar.tw:8080/";
			if (url) {
				url = url.replace("wwwroot\\", "").replace(/\\/g, "/");
				return `${BaseUrl}/${url}`;
			}
		},
		saveImgName(url, name) {
			localStorage.setItem("supplyImgUrl", url);
			localStorage.setItem("supplyName", name);
		},
	},
};
</script>
