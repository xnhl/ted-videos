<template>
	<div id="navigation-wrapper">
		<nuxt-link class="navigation-item" to="/" active-class="active">New</nuxt-link>
		<nuxt-link class="navigation-item" to="/top" active-class="active">Top</nuxt-link>
		<nuxt-link class="navigation-item" to="/popular" active-class="active">Popular</nuxt-link>
		<img id="theme" src="/icons/sun.svg" alt="theme" @click="toggleTheme">
	</div>
</template>

<script>
export default {
	name: "Navigation",
	data() {
		return {
			scroll_old: 0,
			scroll_new: 0
		}
	},
	methods: {
		toggleTheme: function() {
			this.$emit("toggle-theme")
		},
		handleScroll: function() {
			let y = window.scrollY
			this.scroll_new = y
			let nav_wrapper = document.getElementById("navigation-wrapper")
			if (this.scroll_new > this.scroll_old) {
				nav_wrapper.classList.add("nav-hidden")
				this.scroll_old = y
			} else if (this.scroll_new < this.scroll_old) {
				nav_wrapper.classList.remove("nav-hidden")
				this.scroll_old = y
			}
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll)
	}
}
</script>

<style lang="sass">
#navigation-wrapper
	@include flexCenter
	justify-content: flex-start
	background: var(--gray-two)
	transition: $transition
	border-radius: 0 0 0.25rem 0.25rem
	position: fixed
	top: 0
	width: 100%
	z-index: 5
	margin: 0 auto
	transition: $transition
	&.nav-hidden
		top: -3rem
	.navigation-item
		width: auto
		padding: 0.5rem
		text-decoration: none
		&:hover
			box-shadow: var(--theme-boxShadowHover)
		&.active
			box-shadow: var(--theme-boxShadow)
	#theme
		position: absolute
		right: 0
		height: 1rem
		width: 1rem
		cursor: pointer
		padding: 0.5rem
		margin: 0 0.5rem 0 0.5rem
		filter: var(--theme-icon)
		box-sizing: content-box
		transition: $transition
</style>
