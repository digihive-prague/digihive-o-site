import Swiper, { Autoplay } from 'swiper'

const swiper = new Swiper('.clients-carousel', {
	slidesPerView: 3,
	autoplay: true,
	modules: [Autoplay],
	breakpoints: {
		640: {
			slidesPerView: 4
		},
		1024: {
			slidesPerView: 5,
			roundLengths: true
		}
	}
})
