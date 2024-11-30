<template>
	<div class="lg:max-w-[1110px] mx-auto text-white py-36 px-6 md:px-10 lg:px-0">
		<div class="flex justify-start items-center">
			<div class="w-2 h-2 bg-primary-orange mr-4"></div>
			<div class="text-white text-4xl font-bold">耗能總覽</div>
			<div class="w-12 h-1 bg-primary-orange ml-4"></div>
		</div>

		<div class="mt-5 text-white text-lg font-semibold tracking-[2px]">
			本智慧建築偵測項目包含有 :
			用電量、雨水閥、用水量、空氣品質等種類監測數據。
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
			<div class="w-full h-fit bg-black/50">
				<CommonLineChart
					v-if="electricity"
					:chart-data="electricity.data"
					title="每月用電總量"
					tooltip="TotalKw"
				/>
			</div>
			<div class="bg-black/50 w-full h-fit">
				<CommonLineChart
					v-if="water"
					:chart-data="water.data"
					title="每月用水總量"
				/>
			</div>
			<div class="bg-black/50 w-full h-fit">
				<CommonLineChart
					v-if="rain"
					:chart-data="rain.data"
					title="每月雨水筏基貯集量"
					tooltip="TotalValue"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import { getIndexValue } from "@/api/main";

export default {
	data() {
		return {
			chartData: [],
		};
	},
	computed: {
		electricity() {
			return this.chartData.find((item) => item.typeName === "Electricity");
		},
		water() {
			return this.chartData.find((item) => item.typeName === "Water");
		},
		rain() {
			return this.chartData.find((item) => item.typeName === "Rain");
		},
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			getIndexValue()
				.then((res) => {
					this.chartData = res.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
