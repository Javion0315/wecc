<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div class="text-4xl text-white mt-4 mb-6">雨水筏基水位監測</div>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<!-- 年度統計 -->
			<div class="bg-black/50 w-full h-fit p-6">
				<div
					class="flex justify-end items-center border-b border-gray-200 pb-3 mb-3"
				>
					<div class="text-white">選擇年度：</div>
					<select v-model="yearSelected" class="w-fit h-7 rounded bg-white">
						<option
							v-for="(option, index) in yearOptions"
							:key="index"
							:value="option.value"
						>
							{{ option.label }}
						</option>
					</select>
				</div>

				<SupplyColumnChart
					:chart-data="yearList"
					tooltip="雨量"
					title="年度統計"
					xLabel="月份"
					yLabel="雨量(毫米)"
					xKey="month"
					yKey="totalValue"
				/>
			</div>
			<!-- 按月統計 -->
			<div class="bg-black/50 w-full h-fit p-6">
				<div
					class="flex justify-end items-center border-b border-gray-200 pb-3 mb-3"
				>
					<div class="text-white">Year：</div>
					<select v-model="monthYear" class="w-fit h-7 rounded bg-white">
						<option
							v-for="(option, index) in yearOptions"
							:key="index"
							:value="option.value"
						>
							{{ option.label }}
						</option>
					</select>
					<div class="text-white ml-2">Month：</div>
					<select v-model="monthSelected" class="w-fit h-7 rounded bg-white">
						<option
							v-for="(option, index) in monthOptions"
							:key="index"
							:value="option"
						>
							{{ option }}
						</option>
					</select>
					<button
						@click="getMonthValue"
						class="bg-primary-blue text-white rounded-lg px-4 py-1 ml-2"
					>
						Update
					</button>
				</div>

				<SupplyColumnChart
					:chart-data="monthList"
					tooltip="雨量"
					title="按月統計"
					xLabel=""
					yLabel=""
					xKey="date"
					yKey="totalValue"
				/>
			</div>
			<!-- 當日統計 -->
			<div class="bg-black/50 w-full h-fit p-6">
				<div class="flex justify-end items-center pb-5 mb-9"></div>
				<SupplyColumnChart
					:chart-data="dayList"
					tooltip="雨量"
					title="當日統計"
					xLabel="Hour"
					yLabel="Rainfall(mm)"
					xKey="hour"
					yKey="totalValue"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getSmartSupplyRainYearValue,
	getSmartSupplyRainMonthValue,
	getSmartSupplyRainDayValue,
} from "@/api/main";
import Button from "../common/Button.vue";

export default {
	components: { Button },
	data() {
		return {
			isLoading: false,
			yearList: [],
			yearOptions: [],
			yearSelected: new Date().getFullYear(),
			monthList: [],
			monthYear: new Date().getFullYear(),
			monthOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			monthSelected: new Date().getMonth() + 1,
			dayList: [],
		};
	},
	watch: {
		yearSelected() {
			this.getYearValue();
		},
	},
	mounted() {
		this.getYearValue();
		this.getMonthValue();
		this.getDayValue();
		const currentYear = new Date().getFullYear();
		for (let i = currentYear; i >= 2022; i--) {
			this.yearOptions.push({
				label: `${i}年`,
				value: i.toString(),
			});
		}
	},
	methods: {
		getYearValue() {
			this.isLoading = true;
			getSmartSupplyRainYearValue(this.$route.params.id, this.yearSelected)
				.then((res) => {
					this.yearList = res.data;
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		getMonthValue() {
			this.isLoading = true;
			getSmartSupplyRainMonthValue(
				this.$route.params.id,
				this.monthYear,
				this.monthSelected
			)
				.then((res) => {
					this.monthList = res.data;
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		getDayValue() {
			this.isLoading = true;
			getSmartSupplyRainDayValue(this.$route.params.id)
				.then((res) => {
					this.dayList = res.data;
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
