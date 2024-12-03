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
			<div class="flex flex-col items-center pt-12">
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
				<div>
					<select v-model="selected" class="w-40 h-7 mt-4 rounded bg-white">
						<option
							v-for="(option, index) in options"
							:key="index"
							:value="option"
						>
							{{ option }}
						</option>
					</select>
				</div>
				<hr class="w-40 my-6 border border-gray-400" />
				<div>
					<div class="flex flex-col gap-4 mt-4">
						<div
							class="flex flex-col justify-center items-center hover:text-white lg:hover:bg-blue-500/80 gap-4 p-7 rounded-lg cursor-pointer"
							v-for="(item, index) in sideList"
							:key="index"
							:class="
								item.value === 'all'
									? 'lg:bg-blue-500/80 bg-blue-700 text-white'
									: ' bg-black/45 text-gray-400'
							"
							@click="
								item.value === 'all'
									? $emit('get-device-value', selected)
									: $router.push({ name: 'index' })
							"
						>
							<font-awesome-icon class="text-3xl" :icon="item.icon" />
							<div>
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
		options: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			buildingImage: localStorage.getItem("imgUrl"),
			buildingName: localStorage.getItem("buildingName"),
			selected: "",
			sideVale: "all",
			sideList: [
				{ label: "資訊總覽", icon: ["fas", "gauge"], value: "all" },
				{ label: "返回計畫首頁", icon: ["fas", "house"], value: "back" },
			],
		};
	},
	watch: {
		selected: {
			handler() {
				this.$emit("get-device-value", this.selected);
			},
			immediate: true,
		},
		options: {
			handler() {
				this.selected = this.options[0];
			},
			immediate: true,
		},
	},
};
</script>
