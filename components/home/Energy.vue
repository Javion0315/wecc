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
					:chart-data="electricity.data"
					title="每月用電總量"
					tooltip="TotalKw"
				/>
			</div>
			<div class="bg-black/50 w-full h-fit">
				<CommonLineChart :chart-data="water.data" title="每月用水總量" />
			</div>
			<div class="bg-black/50 w-full h-fit">
				<CommonLineChart
					:chart-data="rain.data"
					title="每月雨水筏基貯集量"
					tooltip="TotalValue"
				/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			chartData: [
				{
					typeName: "Electricity",
					data: [
						{
							year: 2023,
							month: 11,
							value: 203769.12,
						},
						{
							year: 2023,
							month: 12,
							value: 252464.46,
						},
						{
							year: 2024,
							month: 1,
							value: 258817.8,
						},
						{
							year: 2024,
							month: 2,
							value: 231627.04,
						},
						{
							year: 2024,
							month: 3,
							value: 97172.63,
						},
						{
							year: 2024,
							month: 4,
							value: 198752.5,
						},
						{
							year: 2024,
							month: 5,
							value: 208708.66,
						},
						{
							year: 2024,
							month: 6,
							value: 217875.9,
						},
						{
							year: 2024,
							month: 7,
							value: 241956.55,
						},
						{
							year: 2024,
							month: 8,
							value: 245533.37,
						},
						{
							year: 2024,
							month: 9,
							value: 229588.6,
						},
						{
							year: 2024,
							month: 10,
							value: 287412.2,
						},
						{
							year: 2024,
							month: 11,
							value: 379678.69,
						},
					],
				},
				{
					typeName: "Water",
					data: [],
				},
				{
					typeName: "Rain",
					data: [
						{
							year: 2023,
							month: 11,
							value: 2549555.42,
						},
						{
							year: 2023,
							month: 12,
							value: 2422168.54,
						},
						{
							year: 2024,
							month: 1,
							value: 2417195.56,
						},
						{
							year: 2024,
							month: 2,
							value: 1999924.28,
						},
						{
							year: 2024,
							month: 3,
							value: 2302367.57,
						},
						{
							year: 2024,
							month: 4,
							value: 3531047.64,
						},
						{
							year: 2024,
							month: 5,
							value: 501854.08,
						},
						{
							year: 2024,
							month: 6,
							value: 498105.59,
						},
						{
							year: 2024,
							month: 7,
							value: 552524.73,
						},
						{
							year: 2024,
							month: 8,
							value: 664325.8,
						},
						{
							year: 2024,
							month: 9,
							value: 377475.37,
						},
						{
							year: 2024,
							month: 10,
							value: 1903640.02,
						},
						{
							year: 2024,
							month: 11,
							value: 1205264.45,
						},
					],
				},
			],
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
};
</script>
