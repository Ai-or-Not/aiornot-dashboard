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

class DashboardService {
	constructor() {
		const bearerToken = localStorage.getItem('_ms-mid') ?? ''
		const baseUrl = 'https://atrium-prod-api.optic.xyz/aion/users'
		this.client = new RestClient(baseUrl, bearerToken)
	}

	static getInstance() {
		if (!DashboardService.instance) {
			DashboardService.instance = new DashboardService()
		}
		return DashboardService.instance
	}

	static async fetchRequests(offset = 0, limit = 10) {
		try {
			const client = DashboardService.getInstance().client
			const endpoint = `data?filters=requests&offset=${offset}&limit=${limit}`
			return await client.get(endpoint).then((data) => data.requests.array)
		} catch (error) {
			console.error('Ошибка getRequests:', error)
			return []
		}
	}

	static async fetchUsageApi() {
		try {
			const client = DashboardService.getInstance().client
			const endpoint = `data?filters=api&offset=0&limit=10`
			return await client.get(endpoint).then((data) => data.api)
		} catch (error) {
			console.error('Ошибка fetchUsageApi:', error)
			return []
		}
	}

	static async signUp() {
		try {
			const client = DashboardService.getInstance().client
			return await client
				.post('sign_up')
				.then((data) => false)
				.catch((error) => {
					if (error.status === 400) {
						return true
					}
					throw error
				})
		} catch (error) {
			console.console.error('Ошибка signUp:', error)
		}
	}

	static async login() {
		try {
			const client = DashboardService.getInstance().client
			return await client.get('login')
		} catch (error) {
			console.console.error('Ошибка login:', error)
		}
	}

	static async delete() {
		try {
			const client = DashboardService.getInstance().client
			AuthService.removeAuth()
			return await client.delete('')
		} catch (error) {
			console.console.error('Ошибка delete:', error)
		}
	}

	static async fetchApiToken() {
		try {
			const client = DashboardService.getInstance().client
			return await client.post('api_token')
		} catch (error) {
			console.console.error('Ошибка fetchApiToken:', error)
		}
	}

	static async refreshApiToken() {
		try {
			const client = DashboardService.getInstance().client
			return await client.patch('api_token')
		} catch (error) {
			console.console.error('Ошибка fetchApiToken:', error)
		}
	}
}

class AIGeneratedService {
	constructor() {
		const bearerToken = localStorage.getItem('_ms-mid') ?? ''
		const baseUrl = 'https://atrium-prod-api.optic.xyz/aion/ai-generated'
		this.client = new RestClient(baseUrl, bearerToken)
	}

	static getInstance() {
		if (!AIGeneratedService.instance) {
			AIGeneratedService.instance = new AIGeneratedService()
		}
		return AIGeneratedService.instance
	}

	static async getReportsByBinary(file) {
		const client = AIGeneratedService.getInstance().client

		try {
			const formData = new FormData()
			formData.append('binary', file, 'uploaded-file.png')
			return await client.postBinary('reports/binary', formData)
		} catch (error) {
			console.error('Error getReportsByBinary:', error)
		}
	}

	static async getReportsByUrl(url) {
		const client = AIGeneratedService.getInstance().client

		try {
			const endpoint = `reports/url?url=${url}`
			return await client.post(endpoint, {})
		} catch (error) {
			console.error('Ошибка getReportsByUrl:', error)
		}
	}
}

class OpenAIGeneratedService {
	constructor() {}

	static async getReportsByBinary(file, visitorId) {
		const baseUrl = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/raw?source=web&user_id=${visitorId}`
		const formData = new FormData()
		formData.append('binary', file, 'file_name.png')

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('_ms-mid') ?? ''}`,
			},
			body: formData,
		}

		return await fetch(baseUrl, options).then((response) => response.json())
	}

	static async getReportsByUrl(url, visitorId) {
		const baseUrl = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/json?source=web&user_id=${visitorId}`

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('_ms-mid') ?? ''}`,
			},
			body: JSON.stringify({
				object: url,
			}),
		}

		return await fetch(baseUrl, options).then((response) => response.json())
	}

	static async sendFeedback(id, reportPredict, reportComment) {
		const body = {
			is_proper_predict: reportPredict,
			comment: reportComment,
		}

		let url = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/result/${id}`
		let options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		const isUserAuthorized = localStorage.getItem('_ms-mid') ? true : false
		if (isUserAuthorized) {
			url = `https://atrium-prod-api.optic.xyz/aion/ai-generated/reports/${id}`
			options = {
				method: 'PATCH',
				body: JSON.stringify(body),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		}

		await fetch(url, options)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error))
	}
}

class WrapperAIGeneratedService {
	static async getReportsByBinary(file, visitorId) {
		if (localStorage.getItem('_ms-mid') !== null) {
			return await AIGeneratedService.getReportsByBinary(file)
		} else {
			return await OpenAIGeneratedService.getReportsByBinary(file, visitorId)
		}
	}
	static async getReportsByUrl(url, visitorId) {
		if (localStorage.getItem('_ms-mid') !== null) {
			return await AIGeneratedService.getReportsByUrl(url)
		} else {
			return await OpenAIGeneratedService.getReportsByUrl(url, visitorId)
		}
	}

	static async sendFeedback(id, reportPredict, reportComment) {
		return await OpenAIGeneratedService.sendFeedback(id, reportPredict, reportComment)
	}
}

class RequestCounter {
	static key = 'requestCount'

	constructor() {}

	static isLimitExceeded() {
		if (localStorage.getItem('_ms-mid') !== null) {
			return false
		}

		const count = localStorage.getItem(RequestCounter.key)
		if (count === null) {
			return false
		}

		return count > 5
	}

	static increment() {
		const count = localStorage.getItem(RequestCounter.key)
		const newCount = count === null ? 1 : Number(count) + 1
		localStorage.setItem(RequestCounter.key, newCount)
	}
}

class AuthService {
	static key = 'isSignUp'

	constructor() {}

	static isAuth() {
		if (localStorage.getItem(AuthService.key) !== null) {
			return true
		}

		return false
	}

	static setAuth() {
		localStorage.setItem(AuthService.key, 'true')
	}

	static removeAuth() {
		localStorage.removeItem(AuthService.key)
	}

	static async init() {
		if (AuthService.isAuth()) {
			await DashboardService.login()
		} else {
			await DashboardService.signUp()
			AuthService.setAuth()
			await DashboardService.login()
		}
	}
}

class ElementCreator {
	static async fillGridResults(elementId, array) {
		const results = document.getElementById(elementId)
		results.style.display = 'grid'
		array.forEach((item) => {
			let requestItem = document.createElement('div')
			requestItem.classList.add('request-item')
			let verdict = document.createElement('div')
			verdict.classList.add('request-item-verdict')
			verdict.innerText = item.verdict
			let image = document.createElement('img')
			image.src = item.url
			image.alt = item.verdict
			let shareButton = document.createElement('button')
			shareButton.onclick = () => {
				shareButton.innerText = 'Copied!'
				copyToClipboard(`https://results.aiornot.com/aiornot/users/${item.id}`)
				setTimeout(() => {
					shareButton.innerText = 'Share'
				}, 1500)
			}
			shareButton.innerText = 'Share'
			shareButton.classList.add('request-item-share')
			shareButton.style.opacity = 0
			requestItem.appendChild(shareButton)
			requestItem.appendChild(image)
			requestItem.appendChild(verdict)
			results.appendChild(requestItem)
		})
	}

	static async fillApiKeyCard(data) {
		const formattedDate = (dateStr) => {
			const date = new Date(dateStr)
			const options = {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}
			return date.toLocaleDateString('en-US', options)
		}

		const apiKeyCard = document.getElementById('api-item')
		// const nameApiKey = document.getElementById('name-api-key')
		// const lastUsed = document.getElementById('last-used')
		const expireDate = document.getElementById('expire-date')
		const rps = document.getElementById('rps')
		const progressLine = document.getElementById('progress-line')
		const counterRequests = document.getElementById('counter-requests')
		const totalEequests = document.getElementById('total-requests')

		// nameApiKey.innerText = data?.name ?? 'Empty'
		// lastUsed.innerText = data?.last_used ?? 'Empty'
		expireDate.innerText = formattedDate(data?.expiration_dt)
		rps.innerText = data.limits.secondly
		progressLine.style.width = `${(data.usage.daily / data.limits.daily) * 100}%`
		console.log((data.usage.daily / data.limits.daily) * 100)
		counterRequests.innerText = data.usage.daily
		totalEequests.innerText = data.limits.daily

		apiKeyCard.style.display = 'flex'

		document.getElementById('api-copy').onclick = () => {
			copyToClipboard(data.key)
		}
	}
}
