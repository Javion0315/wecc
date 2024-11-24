<template>
	<div class="bg-black/80 py-4 fixed top-0 w-full">
		<div
			class="relative lg:max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 flex justify-between items-center"
		>
			<div
				class="cursor-pointer"
				@click="$router.push({ path: '/' }), (actived = 'index')"
			>
				<img class="w-[200px]" src="logo.png" alt="logo" />
			</div>
			<div class="lg:flex justify-end items-center gap-6 hidden">
				<a
					class="py-2"
					v-for="(nav, index) in navList"
					:key="index"
					:href="'#' + nav.url"
					:class="
						actived === nav.url
							? 'text-primary-orange border-b border-primary-orange'
							: 'text-white'
					"
					@click.prevent="scrollToSection(nav.url)"
				>
					{{ nav.label }}
				</a>
			</div>
			<div
				class="bg-primary-orange text-white px-3 py-2 flex justify-center items-center rounded-lg lg:hidden cursor-pointer"
				@click="showNav = !showNav"
			>
				<font-awesome-icon class="text-xl" :icon="['fas', 'bars']" />
			</div>
			<div
				class="lg:hidden flex flex-col text-center gap-6 absolute right-4 top-16 rounded-lg py-3 px-8 bg-white"
				v-if="showNav"
			>
				<a
					class="py-2 font-semibold hover:text-primary-orange"
					v-for="(nav, index) in navList"
					:key="index"
					:href="'#' + nav.url"
					:class="
						actived === nav.url
							? 'text-primary-orange border-b border-primary-orange'
							: 'text-gray-400'
					"
					@click.prevent="scrollToSection(nav.url), (showNav = false)"
				>
					{{ nav.label }}
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			actived: "index",
			navList: [
				{ label: "首頁", url: "index" },
				{ label: "耗能總覽", url: "energy" },
				{ label: "建築智慧雲平台地圖", url: "map" },
				{ label: "亮點計畫", url: "light" },
				{ label: "補助計畫", url: "program" },
				{ label: "電動車專區", url: "electricCar" },
			],
			showNav: false,
		};
	},
	methods: {
		scrollToSection(url) {
			if (url === "index") {
				if (this.$route.path === "/") {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
				} else {
					this.$router.push({ path: "/" });
				}
				this.actived = url;
				return;
			} else if (url === "electricCar") {
				this.$router.push({ name: "electric-car" });
				this.actived = url;
				return;
			} else {
				this.$router.push({ path: "/" });
				const section = document.getElementById(url);
				if (section) {
					section.scrollIntoView({ behavior: "smooth" });
					this.actived = url;
				}
			}
		},
	},
};
</script>
