<template>
	<div class="lg:max-w-[1110px] mx-auto text-white py-36 px-6 md:px-10 lg:px-0">
		<div class="flex justify-start items-center">
			<div class="w-2 h-2 bg-primary-orange mr-4"></div>
			<div class="text-white text-4xl font-bold">補助計畫</div>
			<div class="w-12 h-1 bg-primary-orange ml-4"></div>
		</div>

		<div class="mt-5 text-white text-lg font-semibold tracking-[2px] mb-10">
			因應極端氣候變化可能帶來的災害，高雄市建築將以「節能、安全」作為發展方向，開辦「高雄厝智慧雲」補助，鼓勵民間公寓大廈或大型建築物設置雨水貯集滯洪設施、公共區域用電量觀測系統，推動建築「智慧化」，以鼓勵城市建築導入智慧防災節能科技，邁出數位治理的第一步。
		</div>

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
				>
					<img
						:src="item.image"
						:alt="item.name"
						class="w-full h-[320px] object-cover"
					/>

					<div class="px-4 py-3 bg-black/70 text-white relative">
						<h3 class="text-lg font-medium">
							{{ item.name }}
						</h3>
					</div>
				</div>
			</slide>
		</carousel>
	</div>
</template>


<script>
import { Carousel, Slide } from "vue-carousel";

export default {
	name: "program",
	data() {
		return {
			currentIndex: 0,
			displayCount: 4,
			list: [
				{
					name: "京城鳳翔",
					image: "https://wecc.elfbar.tw/assets/images/6.png",
				},
				{
					name: "微風京品",
					image:
						"https://wecc.elfbar.tw/assets/images/74463bcff8eb473fbec094233d6d2a06.jpg",
				},
				{
					name: "皇苑建設人文首馥大廈",
					image: "https://wecc.elfbar.tw/assets/images/715227_674011.jpeg",
				},
				{
					name: "國揚建設-微笑時代",
					image: "https://wecc.elfbar.tw/assets/images/dali-yang-city-2.jpg",
				},
				{
					name: "福興大樓",
					image: "	https://wecc.elfbar.tw/assets/images/3.png",
				},
				{
					name: "大樹區公所",
					image: "https://wecc.elfbar.tw/assets/images/dali-yang-city-2.jpg",
				},
			],
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
	},
};
</script>
