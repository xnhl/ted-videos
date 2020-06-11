<template>
	<div class="video" :data-date="this.info.date" :data-title="this.info.title" :data-speaker="this.info.speaker" :data-duration="this.info.duration" :data-views="this.info.viewCount" :data-rating="getRating" :data-keywords="getKeywords">
		<div class="video-header">
			<p class="video-title" v-text="`${this.info.title} - ${this.info.speaker}`"></p>
			<hr class="divider">
			<div class="video-header-info">
				<p class="video-header-info-item" v-text="this.info.date"></p>
				<p class="video-header-info-item" v-text="`Duration: ${this.info.duration}`"></p>
				<p class="video-header-info-item" v-text="getViews"></p>
			</div>
		</div>
		<div class="video-main">
			<a class="thumb-container" :href="`https://i.ytimg.com/vi/${this.info.slug}/hqdefault.jpg`" target="_blank">
				<img class="video-thumb lazy" src="" :data-lazysrc="`/images/${this.info.slug}_small.jpg`" :data-lgsrc="`https://i.ytimg.com/vi/${this.info.slug}/hqdefault.jpg`" alt="">
			</a>
			<a class="video-description" :href="`https://www.youtube.com/watch?v=${this.info.slug}`" target="_blank" v-text="this.info.description"></a>
		</div>
		<div class="rating-wrapper">
			<p class="rating-text" v-text="getRating"></p>
			<div class="rating-bar">
				<div class="rating-bar-fill" :style="`width: ${this.info.averageRating * 20}%`"></div>
			</div>
		</div>
		<div class="keywords" v-if="this.info.keywords">
			<div class="keyword" v-for="(keyword, i) in this.info.keywords" :key="i">
				<p class="keyword-text" v-text="keyword"></p>
			</div>
			<p class="keywords-more" v-if="keyWordsMoreThan15" @click="showKeywords">Show more...</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Video',
	props: {
		info: Object
	},
	data() {
		return {}
	},
	computed: {
		getViews: function() {
			let viewcount = this.info.viewCount;
			let viewcountStr = this.info.viewCount.toString();
			let viewcountStrLen = viewcountStr.length;
			if (viewcountStrLen < 7) {
				let roundHundred = Math.ceil(parseInt(viewcount)/100)*100;
				let alt = parseInt(roundHundred/1000);
				return `Views: ${alt}K+`
			} else if (viewcountStrLen >= 7) {
				let milViewCount = viewcountStr.slice(0, -6);
				return `Views: ${milViewCount}M+`
			}
		},
		getRatingActual: function() {
			return parseFloat(this.info.averageRating).toFixed(2)
		},
		getRating: function() {
			return `${parseFloat(this.info.averageRating).toFixed(2)} / 5`
		},
		getKeywords: function() {
			let sorted = this.info.keywords.sort((a, b) => {
				let keyA = a.length;
				let keyB = b.length;
				return keyA - keyB
			});
			return JSON.stringify(sorted)
		},
		keyWordsMoreThan15: function() {
			return this.info.keywords.length > 15
		}
	},
	methods: {
		getKeyword: function(keyword) {
			return keyword.replace(/[^0-9a-z]/gi, "")
		},
		showKeywords: function(e) {
			e.target.classList.add('hide');
			let keywords = [...e.target.parentNode.children];
			let keysLen = keywords.length;
			for (let k = 0; k < keysLen; k++) {
				if (!keywords[k].classList.contains("keywords-more")) {
					keywords[k].style.display = "flex"
				}
			}
		}
	}
}
</script>

<style lang="sass">
.video
	color: white
	flex: 1
	animation: fadeIn 0.3s
	@include flexCenter
	flex-direction: column
	padding: 0
	margin: 0.5rem
	border-radius: 0.25rem
	min-width: 100%
	overflow: hidden
	transition: $transition
	background: var(--theme-itemWhite)
	text-decoration: none
	box-shadow: $boxShadowLight
	@media (min-width: 70rem)
		min-width: 40%
	&:hover
		box-shadow: $boxShadow
		.video-header
			.divider
				width: 90%
		.video-main
			.video-description
				color: var(--theme-black)
	.video-header
		min-width: 100%
		height: auto
		@include flexCenter
		.video-title
			flex: auto
			min-width: 100%
			@include flexCenter
			font-size: 1.1rem
			text-decoration: none
			margin: 0 auto
			padding: 0.5rem 0.25rem
			text-align: center
		.video-speaker
		.video-header-info
			min-width: 100%
			padding: 0.25rem 0
			@include flexCenter
			.video-header-info-item
				margin: 0 1rem
		.divider
			background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))
			width: 50%
			border: 0
			height: 1px
			filter: var(--theme-icon)
			margin: 0.5rem auto
			transition: width 0.3s
	.video-main
		width: 100%
		flex: auto
		@include flexCenter
		.video-description
			@include flexCenter
			padding: 1rem
			flex: 1
			text-decoration: none
			color: var(--theme-blackLight)
			text-align: left
			text-indent: 1rem
			word-break: break-word
			@media (max-width: 31rem)
				min-width: 100%
		.thumb-container
			@include flexCenter
			min-width: 225px
			margin: 1rem
			height: 175px
			border-radius: 0.25rem
			box-sizing: content-box
			background: var(--theme-whiteBG)
			.video-thumb
				border-radius: 0.2rem
				margin: 0.5rem
				width: auto
				height: auto
	.rating-wrapper
		width: 100%
		padding: 0.5rem
		@include flexCenter
		.rating-text
			width: auto
			padding: 0.25rem
			font-size: 0.8rem
			@include flexCenter
		.rating-bar
			flex: 1
			margin: 0 0.5rem
			height: 1rem
			border-radius: 0.25rem
			overflow: hidden
			background: desaturate(red, 66)
			.rating-bar-fill
				background: desaturate(green, 66)
				height: 100%
	.keywords
		width: 100%
		padding: 0.25rem
		display: flex
		flex-wrap: wrap
		align-items: stretch
		justify-content: center
		.keyword
			@include flexCenter
			width: auto
			flex: 1
			margin: 0.1rem
			cursor: pointer
			border-radius: 0.25rem
			background: rgba(lighten(blue, 20), 0.1)
			text-decoration: none
			transition: all 0.3s
			white-space: nowrap
			&:hover
				background: rgba(lighten(blue, 20), 0.25)
			&:nth-child(n+16)
				display: none
			.keyword-text
				padding: 0.25rem
				font-size: 0.8rem
		.keywords-more
			padding: 0.25rem
			min-width: 100%
			flex: 1
			cursor: pointer
</style>
