<template>
	<div id="wrapper">
		<div id="videos-container">
			<Video v-for="(video, i) in list" :class="{ 'lazyloading': i > 9 }" :key="i" :info="video" />
		</div>
	</div>
</template>

<script>
import Video from '@/components/Video'
import list from '@/assets/data/views'
export default {
	name: 'popular',
	components: {Video},
	data() {
		return {
			offset: 1,
			num: 20,
			list
		}
	},
	methods: {
		showNext: function() {
			let videos = [...document.getElementsByClassName("video")];
			let to_show = videos.slice(this.offset*this.num, (this.offset*this.num)+this.num);
			for (let video of to_show) {
				video.classList.remove("lazyloading")
			}
			this.offset++
		}
	},
	mounted() {
		var lazyloadImages = document.querySelectorAll('.lazy');
		var imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					var image = entry.target;
					image.src = image.dataset.lazysrc;
					image.classList.remove('lazy');
					imageObserver.unobserve(image)
				}
			})
		});
		lazyloadImages.forEach((image) => {
			imageObserver.observe(image)
		});
		var loader = document.querySelector('#trigger-wrapper');
		var loadObserver = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) {
				this.showNext()
			}
			var imgArr = document.querySelectorAll('.lazy');
			imgArr.forEach((image) => {
				imageObserver.observe(image)
			});
		});
		loadObserver.observe(loader)
	},
	head() {
		return {
			title: 'TED',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ''
				}
			]
		}
	}
}
</script>

<style lang="sass">
#wrapper
	margin: 0 auto
	min-height: 100vh
	margin-top: 2rem
	@include flexCenter
	text-align: center
	flex-direction: column
	padding: 0.5rem
	position: relative
	animation: fadeIn 0.3s
	@include pageWrapper
	@media (min-width: 40rem)
		padding: 1rem
	#sorter
		min-width: 75%
		max-width: 80%
		flex: 1
		position: sticky
		top: 1.7rem
		background: #555
		@include flexCenter
		#sorter-header
			width: auto
			padding: 0.5rem
		#sorter-options
			flex: auto
			@include flexCenter
			.sorter-option
				min-width: 10%
				flex: 1
				padding: 0.5rem
	#show-sort
		z-index: 3
		position: fixed
		right: 0.5rem
		top: 2.25rem
		padding: 0.5rem
		z-index: 5
		opacity: 0.75
		border-radius: 50%
		background: rgba(white, 0.15)
		cursor: pointer
		@include flexCenter
		box-sizing: content-box
		#show-sort-icon
			height: 1.25rem
			width: 1.25rem
			padding: 0.25rem
			box-sizing: content-box
	#videos-container
		padding: 0.5rem
		border-radius: 0.25rem
		@include flexCenter
		align-items: stretch
		background: var(--theme-whiteBG)
</style>
