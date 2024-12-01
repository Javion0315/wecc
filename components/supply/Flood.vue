<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div class="text-4xl text-white mt-4 mb-6">淹水偵測高度 (M)</div>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<div class="bg-black/50 w-full h-fit p-6">
				<highchart
					:options="chartOptions"
					v-if="chartOptions && chartOptions.series"
				/>
			</div>
			<div>
				<div
					class="bg-black/50 w-full h-fit p-6 text-white flex justify-center items-center gap-12"
				>
					<div class="w-20 h-20">
						<img src="@/assets/images/water-temp.png" alt="water-temp" />
					</div>
					<div>
						<div class="text-4xl">{{ floodInfo.limitValue }}</div>
						<div class="text-base">淹水警戒值 (M)</div>
					</div>
				</div>
				<div
					class="bg-black/50 mt-6 w-full h-fit p-6 text-white flex justify-center items-center gap-12"
				>
					<div class="w-20 h-20">
						<img src="@/assets/images/alert.png" alt="alert" />
					</div>
					<div>
						<div class="text-4xl">{{ floodInfo.alertTime }}</div>
						<div class="text-base">警報時間</div>
					</div>
				</div>
			</div>

			<div class="bg-black/50 w-full h-fit p-6">
				<SupplyColumnChart
					v-if="floodInfo && floodInfo.data"
					:chart-data="floodInfo.data"
					tooltip="淹水偵測"
					title="淹水偵測"
					xLabel="時間"
					yLabel="高度(M)"
					xKey="eventTime"
					yKey="value"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { getSmartSupplyFloodValue } from "@/api/main";

export default {
	data() {
		return {
			isLoading: false,
			currentValue: 0,
			floodInfo: {},
		};
	},
	computed: {
		chartOptions() {
			return {
				chart: {
					backgroundColor: "transparent",
					type: "gauge",
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false,
					height: "80%",
				},
				credits: {
					enabled: false,
				},
				title: {
					text: "淹水偵測高度 (M)",
					style: {
						color: "#FFF",
						fontSize: "20px",
					},
				},
				pane: {
					startAngle: -90,
					endAngle: 89.9,
					background: null,
					center: ["50%", "75%"],
					size: "110%",
				},
				// The value axis with specific tick intervals
				yAxis: {
					min: 0,
					max: 100, // Max value changed to 100
					tickInterval: 10, // Set the tick interval to 10
					tickPosition: "inside",
					tickColor: "#FFFFFF",
					tickLength: 20,
					tickWidth: 2,
					minorTickInterval: null,
					labels: {
						distance: 20,
						style: {
							fontSize: "14px",
							color: "#FFFFFF",
						},
					},
					lineWidth: 0,
					plotBands: [
						{
							from: 0,
							to: 50,
							color: "#55BF3B", // green
							thickness: 20,
							borderRadius: "50%",
						},
						{
							from: 50,
							to: 75,
							color: "#DDDF0D", // yellow
							thickness: 20,
						},
						{
							from: 75,
							to: 100,
							color: "#DF5353", // red
							thickness: 20,
							borderRadius: "50%",
						},
					],
				},
				series: [
					{
						name: "高度",
						data: [this.currentValue],
						tooltip: {
							valueSuffix: " M",
						},
						dataLabels: {
							format: "{y} M",
							borderWidth: 0,
							color: "#333333",
							style: {
								fontSize: "16px",
							},
						},
						dial: {
							radius: "80%",
							backgroundColor: "gray",
							baseWidth: 12,
							baseLength: "0%",
							rearLength: "0%",
						},
						pivot: {
							backgroundColor: "gray",
							radius: 6,
						},
					},
				],
			};
		},
	},
	methods: {
		fetchData() {
			this.isLoading = true;
			getSmartSupplyFloodValue(this.$route.params.id)
				.then((res) => {
					this.floodInfo = res.data[0];
					this.currentValue = Number(this.floodInfo.lastestValue);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
	mounted() {
		this.fetchData();
	},
};
</script>
