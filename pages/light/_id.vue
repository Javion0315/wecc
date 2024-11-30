<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<LightSidebar
			v-if="isSidebarVisible"
			class="z-20 fixed inset-0 lg:relative lg:z-auto"
			@close-sidebar="closeSidebar"
			@get-device-value="selected = $event"
		/>
		<div class="lg:pl-[200px] min-h-screen">
			<LightNavbar @open-sidebar="toggleSidebar" />
			<div class="min-h-screen">
				<div class="text-white pt-24 px-6">
					<div
						class="flex md:flex-row flex-col justify-center md:justify-between items-center w-full"
					>
						<div class="text-4xl text-center lg:text-left">資訊總覽</div>
						<div
							class="bg-[#1e272e] rounded-lg px-16 py-2 text-center mt-4 lg:mt-0 w-fit"
						>
							<div class="text-3xl text-center">{{ buildingName }}</div>
							<div class="text-[#4ff34f] text-center">Online</div>
						</div>
					</div>
				</div>
				<div class="px-5 mt-6 pb-6">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<div v-for="(item, idx) in values" :key="'chart' + idx">
							<LightLineChart
								:chart-data="item.data"
								:limit-value="item.limitValue"
								:type-name="item.typeName"
								:title="`${mapping[item.typeName]} (${item.typeName})`"
							/>
						</div>
					</div>
				</div>
			</div>
			<LightFooter />
		</div>
	</div>
</template>

<script>
import { getSmartLightDeviceValue } from "@/api/main";

export default {
	data() {
		return {
			isLoading: false,
			openSidebar: false,
			selected: "",
			buildingName: localStorage.getItem("buildingName"),
			values: [],
			mapping: {
				Pm1: "超細懸浮微粒",
				Pm2Dot5: "懸浮微粒",
				Pm10: "可吸入懸浮微粒",
				Co: "一氧化碳",
				Co2: "二氧化碳",
				O3: "臭氧",
				Tvoc: "總揮發性有機化合物",
				Hcho: "甲醛",
				Fungi: "真菌",
				Temperature: "溫度",
				Humidity: "濕度",
				Iqa: "室內空氣品質",
				Mold: "黴菌過敏原",
			},
		};
	},
	computed: {
		isSidebarVisible() {
			return this.openSidebar || window.innerWidth >= 1024;
		},
	},
	watch: {
		selected: {
			handler(val) {
				this.getDeviceValue(val);
			},
		},
	},
	methods: {
		toggleSidebar() {
			this.openSidebar = !this.openSidebar;
		},
		handleResize() {
			this.openSidebar = window.innerWidth >= 1024;
		},
		closeSidebar() {
			this.openSidebar = false;
		},
		getDeviceValue(val) {
			this.isLoading = true;
			getSmartLightDeviceValue(val)
				.then((res) => {
					this.values = res.data;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
	mounted() {
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.handleResize);
	},
};
</script>

<style scoped>
@media (max-width: 1024px) {
	.lg\:pl-\[200px\] {
		padding-left: 0;
	}
}
</style>
