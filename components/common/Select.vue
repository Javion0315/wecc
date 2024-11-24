<template>
	<div class="relative inline-block w-full" :class="custom" ref="dropdown">
		<div>
			<label class="text-base text-primary-black33 font-bold">{{
				label
			}}</label>
		</div>
		<div
			class="h-10 border-b-2 flex justify-between items-center cursor-pointer px-4"
			:class="[
				isOpen ? 'border-primary-green' : 'border-primary-blackCC',
				inputWidth,
			]"
			@click="isOpen = !isOpen"
		>
			<span
				class="text-sm font-medium w-4/5 text-ellipsis overflow-hidden whitespace-nowrap"
				:class="isOpen ? 'text-primary-green' : 'text-primary-black66'"
			>
				<span v-if="selectedValue">
					{{ selectedValue }}
				</span>
				<span class="text-sm text-primary-graya5" v-else>
					{{ placeholder }}
				</span>
			</span>
			<font-awesome-icon
				:icon="['fas', 'chevron-down']"
				class="ml-1 transform transition-transform duration-300 ease-in-out"
				:class="isOpen ? 'rotate-180' : ''"
			/>
		</div>
		<div
			v-if="isOpen"
			class="px-[15px] py-5 absolute w-full bg-white border border-primary-blackEB rounded-[3px] mt-[5px] z-10 y-scrollbar overflow-y-auto"
			:class="optionClass"
		>
			<div
				v-for="(option, index) in items"
				:key="index"
				@click="selectOption(option)"
				class="text-sm text-primary-black33 cursor-pointer mb-5 last:mb-0 hover:text-primary-green"
			>
				{{ option.text }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			required: false,
			default: "",
		},
		items: {
			type: Array,
			required: false,
			default: () => [],
		},
		placeholder: {
			type: String,
			required: false,
			default: "請選擇",
		},
		value: {
			type: String,
			required: false,
			default: "",
		},
		custom: {
			type: String,
			required: false,
			default: "",
		},
		inputWidth: {
			type: String,
			required: false,
			default: "",
		},
		optionClass: {
			type: String,
			required: false,
			default: "max-h-[300px]",
		},
	},
	model: {
		prop: "value",
		event: "change",
	},
	data() {
		return {
			isOpen: false,
			checkedOptions: [],
		};
	},
	computed: {
		selectedValue() {
			const selectedItem = this.items.find((item) => item.value === this.value);
			return selectedItem ? selectedItem.text : "";
		},
	},
	methods: {
		selectOption(option) {
			this.$emit("change", option.value);
			this.isOpen = false;
		},
		handleClickOutside(e) {
			if (!this.$refs.dropdown.contains(e.target)) {
				this.isOpen = false;
			}
		},
	},
	mounted() {
		document.addEventListener("click", this.handleClickOutside);
	},
	beforeDestroy() {
		document.removeEventListener("click", this.handleClickOutside);
	},
};
</script>
