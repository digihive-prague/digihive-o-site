import Swiper, { Autoplay, Pagination, Grid } from 'swiper'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import 'swiper/css/manipulation'

const swiper = new Swiper('.brands-carousel', {
	slidesPerView: 2,
	grid: {
		rows: 2,
		fill: 'row'
	},
	spaceBetween: 20,
	autoplay: {
		delay: 3000
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	},
	modules: [Autoplay, Pagination, Grid],
	breakpoints: {
		640: {
			slidesPerView: 4
		},
		1024: {
			slidesPerView: 6
		}
	}
})
