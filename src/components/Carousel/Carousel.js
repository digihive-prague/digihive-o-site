import './Carousel.css'

import '../Clients/Clients'
import '../Testimonials/Testimonials'
import '../Brands/Brands'

// Add lazy loaded stylesheet
const css = document.createElement('link')
css.rel = 'stylesheet'
css.href = './assets/css/carousel.css'
document.head.appendChild(css)
