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


const manager = new PlayerManager(
    [
        // new AudioPlayerContainer('witcher-player', 'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3', true),
        // new AudioPlayerContainer('witcher-player1', 'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'),
        new AudioPlayerContainer('witcher-player2', 'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'),
        new AudioPlayerContainer('witcher-player3', 'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3')
    ]
);


//https://www.youtube.com/watch?v=HkwVxyygbdo


// document.getElementById('fileInput').addEventListener('change', function() {
// 	var selectedFile = this.files[0];
// 	if(selectedFile) {
// 		console.log(selectedFile);
// 	}
// });


// var linkIsReady = false;
// var player

// function onYouTubeIframeAPIReady() {
// 	linkIsReady = true;
// }

// function getYoutubeVideoID(url) {
// 	try {
// 		let urlObject = new URL(url);
// 		let params = new URLSearchParams(urlObject.search);
// 		return params.get('v');
// 	} catch (e) {
// 		console.error('Неверный URL', e);
// 		return null;
// 	}
// }


// function onOpenYoutube() { 
// 	const url = document.getElementById('audio-url-input').value;
// 	let videoID = getYoutubeVideoID(url);
// 	if (videoID) {
// 		console.log("ID видео: " + videoID);
// 		player = new YT.Player('youtube-player', {
// 			height: '480',
// 			width: '480',
// 			videoId: videoID,
// 			playerVars: {
// 				controls: 0,
// 				disablekb: 1,
// 				modestbranding: 1,
// 				rel: 0,
// 				showinfo: 0,
// 				autoplay: 0,
// 				rel : 0,
// 				fs: 0,
// 				disablekb: 1
// 			},
// 			events: {
// 				'onReady': (event) => {
// 					event.target.playVideo();
// 				},
// 				'onStateChange': (event) => {
// 					if (event.data == YT.PlayerState.ENDED) {
// 						alert('Видео закончилось');
// 					}
// 				}
// 			}
// 		});
// 	} else {
// 		console.log("Не удалось получить ID видео");
// 	}
// }