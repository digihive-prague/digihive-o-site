import Swiper, { Autoplay, Pagination, EffectFade } from 'swiper'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const swiper = new Swiper('.testimonials-carousel', {
	autoplay: {
		delay: 10000
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	},
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	modules: [Autoplay, Pagination, EffectFade]
})
