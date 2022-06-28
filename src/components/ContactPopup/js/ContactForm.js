export class ContactForm {
	constructor(form) {
		this.form = form
		this.inputs = form.querySelectorAll('.form-input, .form-checkbox')
		this.submit = this.form.querySelector('button[type="submit"]')

		this.form.addEventListener('submit', (event) => {
			event.preventDefault()

			setTimeout(() => {
				this.disableForm()
			}, 50)

			if (!this.validateForm()) {
				setTimeout(() => {
					this.enableForm()
				}, 55)

				return
			}

			this.submitForm()
		})

		this.inputs.forEach((input) => {
			input.addEventListener('change', () => {
				this.validateInput(input)
			})
		})
	}

	disableForm = () => {
		this.inputs.forEach((input) => {
			input.disabled = true
		})

		this.submit.disabled = true
	}

	enableForm = () => {
		this.inputs.forEach((input) => {
			input.disabled = false
		})

		this.submit.disabled = false
	}

	submitForm = () => {
		let data = new FormData(this.form)
		let XMLHttp = new XMLHttpRequest()

		XMLHttp.onreadystatechange = () => {
			if (XMLHttp.readyState === XMLHttpRequest.DONE && XMLHttp.status === 200) {
				let response = JSON.parse(XMLHttp.responseText)
				let feedback = this.form.querySelector('.form-feedback')

				feedback.innerText = response.data

				if (response.success) {
					feedback.classList.remove('hidden')
					feedback.classList.add('text-green-500')
				} else {
					feedback.classList.remove('hidden')
					feedback.classList.add('text-red-500')
				}
			}
		}

		XMLHttp.addEventListener('loadend', () => {
			this.submit.classList.remove('btn-loading')
		})

		data.append('action', 'contact_form')

		XMLHttp.open('POST', '/contact-form.php', true)
		XMLHttp.send(data)
	}

	validateForm = () => {
		let isValid = true

		this.inputs.forEach((input) => {
			if (!this.validateInput(input)) {
				isValid = false
			}
		})

		return isValid
	}

	validateInput = (input) => {
		let group = input.closest('.form-group')
		let type = input.getAttribute('type')
		let isValid = input.checkValidity()

		if (input.classList.contains('as-field') && input.value) {
			isValid = false
			alert('Are you really human?')
		}

		if (type === 'file') {
			if (input.dataset.allowedSize && input.files) {
				Array.from(input.files).forEach((file) => {
					if (file.size > input.dataset.allowedSize) {
						isValid = false
					}
				})
			}
		}

		if (!isValid) {
			group.classList.add('form-group--is-invalid')
		} else {
			group.classList.remove('form-group--is-invalid')
		}

		return isValid
	}
}
