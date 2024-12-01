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
			type: [Array, Object],
			required: true,
		},
		title: {
			type: String,
			required: false,
		},
		tooltip: {
			type: String,
			required: false,
		},
		xLabel: {
			type: String,
			required: false,
		},
		xKey: {
			type: String,
			required: false,
		},
		yLabel: {
			type: String,
			required: false,
		},
		yKey: {
			type: String,
			required: false,
		},
	},
	computed: {
		chartOptions() {
			let vm = this;
			const categories =
				this.title === "淹水偵測"
					? this.chartData.eventTime
					: this.chartData.map((item) => item[this.xKey]);

			return {
				chart: {
					backgroundColor: "transparent",
					type: "column",
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
					style: {
						display: "none",
					},
				},

				yAxis: {
					title: {
						text: this.yLabel,
						style: {
							color: "#FFF",
						},
					},
					labels: {
						style: {
							color: "#FFF",
						},
					},
				},

				xAxis: {
					title: {
						text: this.xLabel,
						style: {
							color: "#FFF",
						},
					},
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
						return `<div> ${this.x} ${vm.xLabel}</div><br />${
							vm.tooltip
						}:<b> ${Highcharts.numberFormat(this.y, 2, ".", ",")}</b>`;
					},
					shared: true,
				},

				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0,
					},
				},

				series: [
					{
						name: vm.tooltip,
						data:
							this.title === "淹水偵測"
								? this.chartData.value.map(Number)
								: this.chartData.map((item) => item[this.yKey]),
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
