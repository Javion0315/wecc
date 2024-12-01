<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<SupplySidebar
			v-if="isSidebarVisible"
			class="z-20 fixed inset-0 lg:relative lg:z-auto"
			@close-sidebar="closeSidebar"
			@get-device-value="selected = $event"
			@can-show-chart="showChart = $event"
		/>
		<div class="lg:pl-[200px] min-h-screen">
			<LightNavbar @open-sidebar="toggleSidebar" />
			<div class="px-5 pb-6 pt-24 min-h-screen">
				{{ showChart }}
				<SupplyElectric
					v-if="
						showChart.isHaveElectric &&
						(selected === 'all' || selected === 'isHaveElectric')
					"
				/>
				<SupplyRain
					v-if="
						showChart.isHaveRain &&
						(selected === 'all' || selected === 'isHaveRain')
					"
				/>
				<SupplyFlood
					v-if="
						showChart.isHaveFlood &&
						(selected === 'all' || selected === 'isHaveFlood')
					"
				/>
				<SupplyWater
					v-if="
						showChart.isHaveWater &&
						(selected === 'all' || selected === 'isHaveWater')
					"
				/>
			</div>
			<LightFooter />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLoading: false,
			openSidebar: false,
			selected: "all",
			buildingName: localStorage.getItem("supplyName"),
			values: [],
			showChart: {},
		};
	},
	computed: {
		isSidebarVisible() {
			return this.openSidebar || window.innerWidth >= 1024;
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
