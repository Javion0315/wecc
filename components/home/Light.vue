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
					class="w-full cursor-pointer max-w-xs shadow-lg border border-white rounded-lg overflow-hidden"
				>
					<img
						:src="formatImg(item.buildingImage)"
						:alt="item.buildingName"
						class="w-full h-48 object-cover"
					/>

					<div class="p-4 bg-white relative">
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
			list: [
				{
					buildingCode: "K0001",
					buildingType: "政府機構",
					buildingName: "高市府建管處辦公室",
					buildingImage: "wwwroot\\assets\\images\\case5.jpg",
				},
				{
					buildingCode: "K0002",
					buildingType: "展覽館",
					buildingName: "高雄展覽館",
					buildingImage: "wwwroot\\assets\\images\\case6.jpg",
				},
				{
					buildingCode: "K0003",
					buildingType: "捷運站",
					buildingName: "美麗島捷運站",
					buildingImage: "wwwroot\\assets\\images\\case2.jpg",
				},
				{
					buildingCode: "K0004",
					buildingType: "捷運站",
					buildingName: "中央公園站",
					buildingImage: "wwwroot\\assets\\images\\case4.jpg",
				},
				{
					buildingCode: "K0005",
					buildingType: "展覽館",
					buildingName: "高雄流行音樂中心",
					buildingImage: "wwwroot\\assets\\images\\case3.jpg",
				},
				{
					buildingCode: "K0006",
					buildingType: "圖書建築",
					buildingName: "高雄市立圖書總館",
					buildingImage: "wwwroot\\assets\\images\\case1.jpg",
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
					console.log(res);
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
	},
};
</script>
