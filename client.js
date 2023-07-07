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

	async delete(endpoint) {
		const url = `${this.apiUrl}/${endpoint}`

		try {
			const response = await fetch(url, {
				method: 'DELETE',
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
		const baseUrl = 'https://atrium-stage-api.optic-dev.xyz/aion/users'
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
			return await client
				.get(endpoint)
				.then((data) => data.requests.array)
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
			return await client.post('login')
		} catch (error) {
			console.console.error('Ошибка login:', error)
		}
	}

	static async delete() {
		try {
			const client = DashboardService.getInstance().client
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

class RequestCounter {
	static key = 'requestCount'

	constructor() {}

	static isLimitExceeded() {
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

class ElementCreator {
	static async fillGridResults(elementId) {
		const array = await DashboardService.fetchRequests()
		const results = document.getElementById(elementId)
		array.forEach((item) => {
			let requestItem = document.createElement('div')
			requestItem.classList.add('request-item')
			let verdict = document.createElement('div')
			verdict.classList.add('request-item-verdict')
			verdict.innerText = item.verdict
			let image = document.createElement('img')
			image.src = item.url
			image.alt = item.verdict
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
		const nameApiKey = document.getElementById('name-api-key')
		const lastUsed = document.getElementById('last-used')
		const expireDate = document.getElementById('expire-date')
		const rps = document.getElementById('rps')
		const progressLine = document.getElementById('progress-line')
		const counterRequests = document.getElementById('counter-requests')
		const totalEequests = document.getElementById('total-requests')

		nameApiKey.innerText = data?.name ?? 'Empty'
		lastUsed.innerText = data?.last_used ?? 'Empty'
		expireDate.innerText = formattedDate(data?.expiration_dt)
		rps.innerText = data.limits.secondly
		progressLine.style.width = `${
			(data.usage.daily / data.limits.daily) * 100
		}%`
		console.log((data.usage.daily / data.limits.daily) * 100)
		counterRequests.innerText = data.usage.daily
		totalEequests.innerText = data.limits.daily

		apiKeyCard.style.display = 'flex'
	}
}

async function main() {
	try {
		// ElementCreator.fillGridResults('results')
		// const usageApi = await DashboardService.fetchUsageApi()

		// if (usageApi.access) {
		// 	ElementCreator.fillApiKeyCard(usageApi)
		// } else {
		// 	// show create api key
		// }

		const apiToken = await DashboardService.fetchApiToken()
		console.log(apiToken)

		// const usageApi = await DashboardService.fetchUsageApi()
		// console.log(usageApi)

		// const signUp = await DashboardService.signUp()
		// console.log(signUp)
	} catch (error) {
		console.error(error)
	}
}

main()
