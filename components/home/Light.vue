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
			:navigation-enabled="true"
			navigationNextLabel="<div style='width: 25px; height: 25px; border-radius: 100%; display: flex; justify-content: center; align-items: center;'>
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill='#ffffff' d='M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z'/></svg>
      </div>"
			navigationPrevLabel="<div style='width: 25px; height: 25px; border-radius: 100%; display: flex; justify-content: center; align-items: center;'>
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill='#f7f7f7' d='M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z'/></svg>
      </div>"
		>
			<slide v-for="(item, index) in list" :key="index">
				<div
					class="w-full max-w-xs shadow-lg border border-white rounded-lg overflow-hidden"
				>
					<img
						:src="formatImg(item.buildingImage)"
						:alt="item.buildingName"
						class="w-full h-48 object-cover"
					/>

					<div
						class="p-4 bg-white relative cursor-pointer"
						@click="
							$router.push({
								name: 'light-id',
								params: { id: item.buildingCode },
							}),
								saveImgName(formatImg(item.buildingImage), item.buildingName)
						"
					>
						<div
							class="text-white w-fit absolute px-3 py-1 -top-3 left-4 text-sm bg-[#4788ff] rounded-3xl"
						>
							{{ item.buildingType }}
						</div>
						<h3
							class="text-xl hover:text-[#4788ff] font-medium text-gray-800 mt-3 mb-2"
						>
							{{ item.buildingName }}
						</h3>
						<div class="text-[#4788ff] text-base hover:text-[#4788ff]/80">
							Read More <font-awesome-icon :icon="['fas', 'chevron-right']" />
						</div>
					</div>
				</div>
			</slide>
		</carousel>
	</div>
</template>

<script>
import { getIndexSmartLight, getArticles } from "@/api/main";
import { Carousel, Slide } from "vue-carousel";

export default {
	name: "Light",
	data() {
		return {
			currentIndex: 0,
			displayCount: 3,
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
				this.displayCount = 2; // 平板
			} else {
				this.displayCount = 3; // 電腦
			}
		},
		getData() {
			getArticles(3).then((res) => {
				this.title = res.data.artileTitle;
				this.editorContent = res.data.articleContent;
			});

			getIndexSmartLight()
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
			localStorage.setItem("imgUrl", url);
			localStorage.setItem("buildingName", name);
		},
	},
};
</script>
