<template>
	<div>
		<div
			class="w-[200px] h-full fixed top-0 left-0 bg-blue-500 lg:bg-opacity-50 z-20"
		>
			<div
				class="text-right p-3 cursor-pointer lg:hidden"
				@click="$emit('close-sidebar')"
			>
				<font-awesome-icon
					class="text-3xl text-white"
					:icon="['fas', 'xmark']"
				/>
			</div>
			<div class="flex flex-col items-center pt-12 pb-12 h-full">
				<div class="w-28 h-28 rounded-lg">
					<img
						:src="buildingImage"
						:alt="buildingName"
						class="w-full h-full object-cover rounded-lg"
					/>
				</div>
				<div>
					<h3 class="text-white text-center text-xl font-medium mt-4">
						{{ buildingName }}
					</h3>
				</div>
				<hr class="w-40 my-6 border border-gray-400" />
				<div class="text-center text-gray-300 font-bold">
					<div>
						戶數：{{
							sidebarInfo.roomAmount === "" ? 0 : sidebarInfo.roomAmount
						}}
						戶
					</div>
					<div>
						人數：{{
							sidebarInfo.peopleAmount === "" ? 0 : sidebarInfo.peopleAmount
						}}
						人
					</div>
					<div>
						樓地板面積：{{
							sidebarInfo.totalArea === "" ? "暫無" : sidebarInfo.totalArea
						}}
					</div>
					<div>
						契約容積：{{
							sidebarInfo.contractCapacity === ""
								? "暫無"
								: sidebarInfo.contractCapacity
						}}
					</div>
				</div>
				<hr class="w-40 my-6 border border-gray-400" />
				<div class="px-4 h-[calc(100vh-250px)] overflow-y-auto">
					<div class="flex flex-col gap-4 mt-4">
						<div
							class="flex flex-col justify-center text-center items-center hover:text-white hover:bg-blue-500/80 gap-4 p-7 rounded-lg cursor-pointer"
							v-for="(item, index) in sideList"
							:key="index"
							:class="[
								item.value === sideValue
									? 'bg-blue-500/80 text-white'
									: ' bg-black/45 text-gray-400',
								item.show ? '' : 'hidden',
							]"
							@click="selected(item.value)"
						>
							<font-awesome-icon class="text-3xl" :icon="item.icon" />
							<div :class="item.value === 'back' && 'whitespace-nowrap'">
								{{ item.label }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		sidebarInfo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			buildingImage: localStorage.getItem("supplyImgUrl"),
			buildingName: localStorage.getItem("supplyName"),
			options: [],
			sideValue: "all",
			sideList: [
				{ label: "資訊總覽", icon: ["fas", "gauge"], value: "all", show: true },
				{
					label: "數位水表",
					icon: ["fas", "droplet"],
					value: "isHaveWater",
					show: false,
				},
				{
					label: "數位電表",
					icon: ["fas", "bolt"],
					value: "isHaveElectric",
					show: false,
				},
				{
					label: "淹水偵測器",
					icon: ["fas", "water"],
					value: "isHaveFlood",
					show: false,
				},
				{
					label: "雨水筏基水位偵測器",
					icon: ["fas", "ruler-vertical"],
					value: "isHaveRain",
					show: false,
				},
				{
					label: "返回計畫首頁",
					icon: ["fas", "house"],
					value: "back",
					show: true,
				},
			],
		};
	},
	watch: {
		sidebarInfo: {
			handler(val) {
				this.sideList.forEach((item) => {
					if (item.value === "isHaveWater") {
						item.show = val.isHaveWater;
					} else if (item.value === "isHaveElectric") {
						item.show = val.isHaveElectric;
					} else if (item.value === "isHaveFlood") {
						item.show = val.isHaveFlood;
					} else if (item.value === "isHaveRain") {
						item.show = val.isHaveRain;
					}
				});
			},
			deep: true,
		},
	},
	methods: {
		selected(value) {
			if (value === "back") {
				this.$router.push({ name: "index" });
			} else {
				this.$emit("get-device-value", value);
				this.sideValue = value;
			}
		},
	},
};
</script>
