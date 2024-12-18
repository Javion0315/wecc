<template>
	<div class="lg:max-w-[1110px] mx-auto text-white py-36 px-6 md:px-10 lg:px-0">
		<div class="flex justify-start items-center">
			<div class="w-2 h-2 bg-primary-orange mr-4"></div>
			<div class="text-white text-4xl font-bold">亮點計畫</div>
			<div class="w-12 h-1 bg-primary-orange ml-4"></div>
		</div>

		<div class="mt-5 text-white text-lg font-semibold tracking-[2px] mb-10">
			高市府推動「智慧建築—空氣品質偵測系統」，目標鎖定改善空汙及推廣垂直綠化，即時偵測家中空氣品質，透過適度換氣、過濾，減緩病毒滋生。藉由感知器，隨時監測室內空氣中的10種汙染源，除了常見的二氧化碳、一氧化碳之外，也能監測室內空氣中的PM2.5細懸浮微粒、PM10懸浮微粒、TVOC揮發性有機物、溫度、濕度、甲醛、黴菌、室外綜合指數，並與空氣清淨設備如空氣清淨機、新風機等連動，一偵測到室內空氣品質變化就會啟動。
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
import { getIndexSmartLight } from "@/api/main";
import { Carousel, Slide } from "vue-carousel";

export default {
	name: "Light",
	data() {
		return {
			currentIndex: 0,
			displayCount: 3,
			list: [],
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
			getIndexSmartLight()
				.then((res) => {
					this.list = res.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		formatImg(url) {
			const BaseUrl = "http://yang332904.synology.me:8080/";
			url = url.replace("wwwroot\\", "").replace(/\\/g, "/");
			return `${BaseUrl}/${url}`;
		},
		saveImgName(url, name) {
			localStorage.setItem("imgUrl", url);
			localStorage.setItem("buildingName", name);
		},
	},
};
</script>
