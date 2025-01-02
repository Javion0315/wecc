<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<SupplySidebar
			v-if="isSidebarVisible"
			class="z-20 fixed inset-0 lg:relative lg:z-auto"
			@close-sidebar="closeSidebar"
			@get-device-value="selected = $event"
			:sidebar-info="sidebarInfo"
		/>
		<div class="lg:pl-[200px] min-h-screen">
			<LightNavbar @open-sidebar="toggleSidebar" />
			<div class="px-5 pb-6 pt-24 min-h-screen">
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
import { getSmartSupplyIndexValue } from "@/api/main";

export default {
	data() {
		return {
			isLoading: false,
			openSidebar: false,
			selected: "",
			buildingName: localStorage.getItem("supplyName"),
			values: [],
			showChart: {},
			sidebarInfo: {},
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
		getSelectData() {
			this.isLoading = true;
			getSmartSupplyIndexValue(this.$route.params.id)
				.then((res) => {
					let data = res.data;
					if (data.length === 0) {
						this.$swal
							.fire({
								title: "查無資料",
								type: "error",
							})
							.then(() => {
								this.$router.push({ path: "/" });
							});
					} else {
						this.showChart = data[0];
						this.sidebarInfo = data[0];
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
	mounted() {
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
		this.getSelectData();
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
