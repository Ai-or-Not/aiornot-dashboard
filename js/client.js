function copyToClipboard(text) {
	const el = document.createElement('textarea')
	el.value = text
	el.setAttribute('readonly', '')
	el.style.position = 'absolute'
	el.style.left = '-9999px'
	document.body.appendChild(el)

	const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false

	el.select()
	el.setSelectionRange(0, text.length)
	document.execCommand('copy')
	document.body.removeChild(el)

	if (selected) {
		document.getSelection().removeAllRanges()
		document.getSelection().addRange(selected)
	}
}
class RestClient {
	constructor(apiUrl, bearerToken) {
		this.apiUrl = apiUrl
		this.bearerToken = bearerToken
	}

	async get(endpoint) {
		const url = `${this.apiUrl}/${endpoint}`

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.bearerToken}`,
				},
			})

			if (response.status === 400) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			} else if (response.status === 401) {
				throw { status: response.status, message: 'Unauthorized' }
			} else if (response.status === 404) {
				throw { status: response.status, message: 'Not Found' }
			}

			if (!response.ok) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			}

			const data = await response.json()
			return data
		} catch (error) {
			console.error('Ошибка при выполнении GET-запроса:', error)
			throw error
		}
	}

	async post(endpoint, body) {
		const url = `${this.apiUrl}/${endpoint}`

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.bearerToken}`,
				},
				body: JSON.stringify(body),
			})

			if (response.status === 400) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			} else if (response.status === 401) {
				throw { status: response.status, message: 'Unauthorized' }
			} else if (response.status === 404) {
				throw { status: response.status, message: 'Not Found' }
			}

			if (!response.ok) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			}

			const data = await response.json()
			return data
		} catch (error) {
			console.error('Ошибка при выполнении POST-запроса:', error)
			throw error
		}
	}
	async postBinary(endpoint, formData) {
		const url = `${this.apiUrl}/${endpoint}`

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${this.bearerToken}`,
				},
				body: formData,
			})

			if (response.status === 400) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			} else if (response.status === 401) {
				throw { status: response.status, message: 'Unauthorized' }
			} else if (response.status === 404) {
				throw { status: response.status, message: 'Not Found' }
			}

			if (!response.ok) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			}

			const data = await response.json()
			return data
		} catch (error) {
			console.error('Ошибка при выполнении POST-запроса:', error)
			throw error
		}
	}

	async delete(endpoint) {
		const url = `${this.apiUrl}`

		try {
			const response = await fetch(url, {
				method: 'DELETE',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${this.bearerToken}`,
				},
			})

			if (response.status === 400) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			} else if (response.status === 401) {
				throw { status: response.status, message: 'Unauthorized' }
			} else if (response.status === 404) {
				throw { status: response.status, message: 'Not Found' }
			}

			if (!response.ok) {
				throw { status: response.status, message: errorData }
			}

			return
		} catch (error) {
			console.error('Ошибка при выполнении DELETE-запроса:', error)
			throw error
		}
	}

	async patch(endpoint, body) {
		const url = `${this.apiUrl}/${endpoint}`

		try {
			const response = await fetch(url, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.bearerToken}`,
				},
				body: JSON.stringify(body),
			})

			if (response.status === 400) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			} else if (response.status === 401) {
				throw { status: response.status, message: 'Unauthorized' }
			} else if (response.status === 404) {
				throw { status: response.status, message: 'Not Found' }
			}

			if (!response.ok) {
				const errorData = await response.json()
				throw { status: response.status, message: errorData }
			}

			const data = await response.json()
			return data
		} catch (error) {
			console.error('Ошибка при выполнении PATCH-запроса:', error)
			throw error
		}
	}
}