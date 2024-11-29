<template>
	<div>
		<highchart :options="chartOptions" v-if="chartOptions.series"></highchart>
	</div>
</template>

<script>
import Highcharts from "highcharts";

export default {
	props: {
		chartData: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			required: false,
		},
		tooltip: {
			type: String,
			required: false,
			default: "TotalValue",
		},
	},
	computed: {
		chartOptions() {
			let vm = this;
			const categories = this.chartData.map(
				(item) => `${item.year}/${item.month}`
			);
			return {
				chart: {
					backgroundColor: "transparent",
				},
				credits: {
					enabled: false,
				},
				title: {
					text: this.title,
					style: {
						font: "normal 14px '微軟正黑體'",
						color: "#FFF",
					},
				},

				subtitle: {
					style: {
						display: "none",
					},
				},

				yAxis: {
					title: {
						text: "",
					},
					labels: {
						style: {
							color: "#FFF",
						},
					},
				},

				xAxis: {
					labels: {
						style: {
							color: "#FFF",
						},
						format: "{value}",
					},
					categories: categories,
				},

				legend: {
					enabled: false,
				},

				tooltip: {
					// 自定義 tooltip 格式
					valueSuffix: "",
					formatter: function () {
						return `<div>${this.x}</div><br />${
							vm.tooltip
						}:<b> ${Highcharts.numberFormat(this.y, 2, ".", ",")}</b>`;
					},
					shared: true,
				},

				plotOptions: {
					series: {
						label: {
							connectorAllowed: false,
						},
						color: "#FFF", // 將線條顏色設置為白色
					},
				},

				series: [
					{
						name: "TotalKw", // 更改圖例中的名稱
						data: this.chartData.map((item) => item.value), // 只提取數值部分
					},
				],

				responsive: {
					rules: [
						{
							condition: {
								maxWidth: 500,
							},
							chartOptions: {
								legend: {
									layout: "horizontal",
									align: "center",
									verticalAlign: "bottom",
								},
							},
						},
					],
				},
			};
		},
	},
};
</script>
