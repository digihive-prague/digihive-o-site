import { ContactForm } from './js/ContactForm'

const contactPopup = document.getElementById('contactPopup')

if (contactPopup) {
	const isFormInit = false

	// Methods
	const openPopup = () => {
		contactPopup.classList.add('block')
		contactPopup.classList.remove('hidden')
		document.body.classList.add('overflow-hidden')

		if (!isFormInit) {
			const contactForms = document.querySelectorAll('.contact-form')

			contactForms.forEach((form, index) => {
				new ContactForm(form)
			})
		}
	}

	const closePopup = () => {
		contactPopup.classList.remove('block')
		contactPopup.classList.add('hidden')
		document.body.classList.remove('overflow-hidden')
	}

	// Listeners
	const openButtons = document.querySelectorAll('.js-open-popup')
	openButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			e.preventDefault()

			openPopup()
		})
	})

	document.getElementById('contactPopupClose').addEventListener('click', (e) => {
		e.preventDefault()

		closePopup()
	})

	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 27) {
			closePopup()
		}
	})
}
