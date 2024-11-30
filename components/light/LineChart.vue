<template>
	<div class="bg-black/50 w-full h-fit p-6">
		<highchart :options="chartOptions" v-if="chartOptions.series"></highchart>
	</div>
</template>

<script>
import Highcharts from "highcharts";

export default {
	props: {
		chartData: {
			type: Object,
			required: true,
		},
		title: {
			type: String,
			required: false,
		},
		limitValue: {
			type: Number,
			required: false,
		},
		typeName: {
			type: String,
			required: false,
		},
	},
	computed: {
		chartOptions() {
			let vm = this;
			const categories = this.chartData.eventTime || []; // 确保categories是数组

			const limitValue = this.limitValue;
			const limitLine = limitValue
				? {
						value: limitValue,
						width: 2,
						color: "#FF4500", // 设置警示线颜色
						dashStyle: "ShortDash", // 设置虚线样式
						label: {
							text: `警示值: ${limitValue}`,
							align: "right",
							style: {
								color: "#FF4500",
								fontWeight: "bold",
							},
						},
				  }
				: null;

			// 设置yAxis的min和max，以确保警示线在可视范围内
			const yAxisMax =
				Math.max(...this.chartData.value.map(Number), limitValue || 0) * 1.1;
			const yAxisMin =
				Math.min(...this.chartData.value.map(Number), limitValue || 0) * 0.9;

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
						font: "normal 18px '微軟正黑體'",
						color: "#FFF",
					},
				},

				subtitle: {
					text: "ug/m³",
					style: {
						font: "normal 14px '微軟正黑體'",
						color: "#FFF",
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
					plotLines: limitLine ? [limitLine] : [], // 添加警示线
					min: yAxisMin, // 设置y轴最小值
					max: yAxisMax, // 设置y轴最大值
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
					// 自定义 tooltip 格式
					valueSuffix: "",
					formatter: function () {
						return `<div>${this.x}</div><br />${
							vm.typeName
						}:<b> ${Highcharts.numberFormat(this.y, 2, ".", ",")}</b>`;
					},
					shared: true,
				},

				plotOptions: {
					series: {
						label: {
							connectorAllowed: false,
						},
						color: "#4788ff", // 将线条颜色设置为蓝色
					},
				},

				series: [
					{
						name: vm.typeName,
						data: this.chartData.value.map(Number), // 只提取数值部分并转换为数字
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
