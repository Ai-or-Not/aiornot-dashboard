

// start Fingerprint

let visitorId

const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3').then((FingerprintJS) => FingerprintJS.load())

async function initFingerPrint() {
	visitorId = await fpPromise
		.then((fp) => fp.get())
		.then((result) => {
			// console.log(result)
			return result.visitorId
		})
}

initFingerPrint()

// end Fingerprint


// LocalStorage request counter

const counterEl_requestCounterValue = document.querySelector('#ai-or-not-dropzone-counter')
const counterEl_requestCounterBlock = document.querySelector('#ai-or-not-dropzone-counter-w')

function updateRequestCounter() {
	if (localStorage.getItem('_ms-mid')) {
		// Hide element
		counterEl_requestCounterBlock.classList.add('hide')
	} else {
		// Increment the count and show element
		const value = localStorage.getItem('requestCount') || '0'
		counterEl_requestCounterValue.textContent = value <= 5 ? value : '5'
		counterEl_requestCounterBlock.classList.remove('hide')
	}
}

updateRequestCounter()

// end LocalStorage request counter

//elements
const reportScreen = document.getElementById('report-screen')
const reportButton_submit = document.querySelector('#button-report-submit')
const reportInput = document.querySelector('#input-report-comment')
const reportButton_true = document.querySelector('#button-report_true')
const reportButton_false = document.querySelector('#button-report_false')
const reportButton_close = document.querySelector('#button-report_close')
const uiEl_urlError = document.querySelector('#url-error-message')
const buttonEl_processClose = document.querySelector('#processing_cancel')
const inputEl_fileInput = document.querySelector('#file-input')
const imageEl_currentImage = document.querySelector('#ai-or-not-current-image')
const imageEl_currentImageEmpty = document.querySelector('#empty-preview-img')
const imageEl_nsfwImage = document.querySelector('#nsfw-preview-img')
const textEl_inputError = document.querySelector('#input-error-text')
const inputEl_urlWaiter = document.querySelector('#ai-or-not_image-url')
const buttonEl_urlCheck = document.querySelector('#ai-or-not_submit')
const uiEl_dropZone = document.querySelector('#ai-or-not_dropzone')
const textEl_dropZoneError = document.querySelector('#ai-or-not_dropzone-text')
const uiEl_resultCol = document.querySelector('#result-screen_col')
const buttonEl_sharedButtons = document.querySelector('#share-items-hide')

//element's arrays
const arrayEl_testImages = document.querySelectorAll('[test-image-url]')
//variables
let pastedUrl
let fileUpload_way
let fileSizeAllow
let currentResultId

//functions


function uiReported_false() {
	let buttonText = document.querySelector('#button-report_false-text')
	buttonText.classList.remove('hide')
	buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported')
	reportButton_false.classList.add('is-reported')
	reportButton_true.classList.add('hide')
}

function uiReported_true() {
	let buttonText = document.querySelector('#button-report_true-text')
	buttonText.classList.remove('hide')
	buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported')
	reportButton_true.classList.add('is-reported')
	reportButton_false.classList.add('hide')
}

function uiReported_initialState() {
	reportInput.value = ''

	let buttonText_true = document.querySelector('#button-report_true-text')
	let buttonText_false = document.querySelector('#button-report_false-text')
	buttonText_false.classList.add('hide')
	buttonText_true.classList.remove('hide')

	buttonText_true.textContent = buttonText_true.getAttribute('report-button-text-default')
	buttonText_false.textContent = buttonText_false.getAttribute('report-button-text-default')

	reportButton_true.classList.remove('is-reported')
	reportButton_false.classList.remove('is-reported')
	reportButton_true.classList.remove('hide')
	reportButton_false.classList.remove('hide')
}

function changeShareUrl(responseId) {
	currentResultId = responseId
	const accessTokenIsExist = localStorage.getItem('_ms-mid') ? false : true

	if (accessTokenIsExist) {
		document.querySelector(
			'[fs-socialshare-element="url"]',
		).textContent = `https://api.aiornot.com/aiornot/${responseId}`

		let allShareUrl = document.querySelectorAll('.result-screen_share-item')

		allShareUrl.forEach((el) => {
			el.setAttribute('data-url', `https://api.aiornot.com/aiornot/${responseId}`)
		})
	} else {
		document.querySelector(
			'[fs-socialshare-element="url"]',
		).textContent = `https://api.aiornot.com/aiornot/users/${responseId}`

		let allShareUrl = document.querySelectorAll('.result-screen_share-item')

		allShareUrl.forEach((el) => {
			el.setAttribute('data-url', `https://api.aiornot.com/aiornot/users/${responseId}`)
		})
	}
}

//ui functions
function fileSizeMessage_ok() {
	textEl_dropZoneError.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.'
	textEl_dropZoneError.classList.remove('text-color-red')
	textEl_inputError.textContent = 'Something went wrong. Try again.'
	uiEl_urlError.classList.add('hide')
}

function someThingWentWrong_error() {
	uiEl_urlError.classList.remove('hide')
}

function someThingWentWrong_ok() {
	uiEl_urlError.classList.add('hide')
}

function fileSizeMessage_error() {
	if (uiEl_resultCol.classList.contains('hide')) {
		textEl_dropZoneError.textContent = 'File is too large (max 10 MB)'
		textEl_dropZoneError.classList.add('text-color-red')
	} else {
		textEl_inputError.textContent = 'File is too large (max 10 MB)'
		uiEl_urlError.classList.remove('hide')
	}
}

inputEl_fileInput.addEventListener('change', () => {
	const fileSize = inputEl_fileInput.files[0].size
	const maxSize = 10 * 1024 * 1024 // 10 MB in bytes
	if (fileSize > maxSize) {
		fileSizeAllow = false
		fileSizeMessage_error()
	} else {
		fileSizeAllow = true
		fileSizeMessage_ok()
	}
})

function error_dropZone() {
	// console.log('ÃÂ¾Ã‘Ë†ÃÂ¸ÃÂ±ÃÂºÃÂ° dropzone')
	document.querySelector('#processing-screen').classList.add('hide')
	textEl_dropZoneError.classList.add('error')
	uiEl_dropZone.classList.add('red-border')
	textEl_dropZoneError.textContent = 'Something went wrong. Try again.'
}

function initial_dropZone() {
	textEl_dropZoneError.classList.remove('error')
	uiEl_dropZone.classList.remove('red-border')
	textEl_dropZoneError.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.'
}

function screen_homeShow() {
	document.querySelector('#choose-file-row').classList.add('hide')
	document.querySelector('#legal-tip').classList.remove('hide')
	document.querySelector('#processing-screen').classList.add('hide')
	document.querySelector('#hero-home_title-description').classList.remove('hide')
	document.querySelector('#hero-home_gallery').classList.remove('hide')
	document.querySelector('#ai-or-not_dropzone').classList.remove('hide')
	document.querySelector('#hero-home_drop-zone-divider').classList.remove('hide')
	document.querySelector('#result-screen_col').classList.add('hide')
	document.querySelector('#result-screen_image-wrapper').classList.add('hide')
	imageEl_currentImage.classList.add('hide')
	imageEl_currentImageEmpty.classList.remove('hide')
	imageEl_nsfwImage.classList.remove('hide')
}

function loadingStart() {
	uiReported_initialState()
	imageEl_currentImage.src = ''
	someThingWentWrong_ok()
	textEl_inputError.textContent = 'Something went wrong. Try again.'
	document.querySelector('#choose-file-row').classList.remove('hide')
	document.querySelector('#legal-tip').classList.add('hide')
	document.querySelector('.processing-screen_triggers_5').click()
	document.querySelector('#processing-screen').classList.remove('hide')
	document.querySelector('.processing-screen_triggers_1').click()
	document.querySelector('#hero-home_title-description').classList.add('hide')
	document.querySelector('#hero-home_gallery').classList.add('hide')
	document.querySelector('#ai-or-not_dropzone').classList.add('hide')
	document.querySelector('#hero-home_drop-zone-divider').classList.add('hide')
	document.querySelector('#result-screen_col').classList.remove('hide')
	document.querySelector('#result-screen_image-wrapper').classList.remove('hide')
}

function loadingFinish(nsfw_detected = false) {
	// console.log('ÃÂ¿ÃÂ¾ÃÂºÃÂ°ÃÂ·Ã‘â€¹ÃÂ²ÃÂ°ÃÂµÃÂ¼ loadingFinish')
	if (nsfw_detected) {
		imageEl_nsfwImage.classList.remove('hide')
		imageEl_currentImage.classList.add('hide')
		imageEl_currentImageEmpty.classList.add('hide')
		// Hide buttons for share the report.
		buttonEl_sharedButtons.classList.add('hide')
	} else {
		imageEl_nsfwImage.classList.add('hide')
		imageEl_currentImage.classList.remove('hide')
		imageEl_currentImageEmpty.classList.add('hide')
		// Show buttons for share the report.
		buttonEl_sharedButtons.classList.remove('hide')
	}

	document.querySelector('.processing-screen_triggers_3').click()
	document.querySelector('#processing-screen').classList.add('hide')
	document.querySelector('.processing-screen_triggers_5').click()

	document.querySelector('#scroll-to-top-trigger').click()
	inputEl_fileInput.value = ''
	document.querySelector('#ai-or-not_image-url').value = ''
}

//function to check json from file sending result

function findHighestConfidence(data) {
	if (data === 'unknown') {
		document.getElementById('title-human').innerHTML =
			"Sorry, but in this case we can't really say if it's AI or Not"
		document.getElementById('ai-or-not_result-message-50').classList.remove('hide')
		document.getElementById('ai-or-not_result-message').classList.add('hide')
		document.getElementById('ai-or-not_result-message-50').innerHTML =
			'Probly the uploaded image has most likely been modified or compressed'
		document.getElementById('title-human').classList.remove('hide')
		document.getElementById('title-ai').classList.add('hide')
	} else {
		document.getElementById('title-ai').innerHTML =
			'This image is generated by <span class="text-color-green">AI</span>'
		document.getElementById('title-human').innerHTML =
			'This image is generated by <span class="text-color-green">Human</span>'
		document.getElementById('ai-or-not_result-message-50').classList.add('hide')
		document.getElementById('ai-or-not_result-message').classList.remove('hide')
		document.querySelector('#ai-or-not_model-name').textContent = data

		if (data === 'ai') {
			document.getElementById('title-human').classList.add('hide')
			document.getElementById('title-ai').classList.remove('hide')
		} else {
			document.getElementById('title-human').classList.remove('hide')
			document.getElementById('title-ai').classList.add('hide')
		}
	}
}

//function to check image by url

async function postToApi_url() {
	if (RequestCounter.isLimitExceeded()) {
		const signInModalElement = document.getElementById('sign-up')
		signInModalElement.style.display = 'flex'
		signInModalElement.style.zIndex = 100
		screen_homeShow()
	} else {
		uiEl_urlError.classList.add('hide')
		loadingStart()

		//TODO
		alert('TODO getReportsByUrl ')
		// await WrapperAIGeneratedService.getReportsByUrl(pastedUrl, visitorId)
		// 	.then((response) => {
		// 		RequestCounter.increment()
		// 		changeShareUrl(response.id)
		// 		imageEl_currentImage.src = pastedUrl
		// 		findHighestConfidence(response.verdict)
		// 		loadingFinish(response.nsfw_detected)
		// 	})
		// 	.catch((error) => {
		// 		if (uiEl_resultCol.classList.contains('hide')) {
		// 			someThingWentWrong_error()
		// 		} else {
		// 			someThingWentWrong_error()
		// 			screen_homeShow()
		// 		}
		// 		console.log(error)
		// 	})
	}
}

//functions reacts on events
buttonEl_processClose.addEventListener('click', function () {
	initial_dropZone()
	screen_homeShow()
})

document.querySelector('#ai-or-not_dropzone').addEventListener('click', function () {
	fileUpload_way = 'screen_home'
	inputEl_fileInput.click()
})

document.querySelector('#choose-file-row').addEventListener('click', function () {
	fileUpload_way = 'screen_result'
	inputEl_fileInput.click()
})

buttonEl_urlCheck.addEventListener('click', () => {
	if (inputEl_urlWaiter.value != '') {
		pastedUrl = inputEl_urlWaiter.value
		postToApi_url()
	}
})

const element = document.querySelector('#ai-or-not_image-url')

element.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		if (inputEl_urlWaiter.value != '') {
			pastedUrl = inputEl_urlWaiter.value
			postToApi_url()
		}
	}
})

reportButton_true.addEventListener('click', () => {
	uiReported_true()
	reportPredict = true
	reportComment = ''
	WrapperAIGeneratedService.sendFeedback(currentResultId, reportPredict, reportComment)
})

reportButton_false.addEventListener('click', () => {})

reportButton_close.addEventListener('click', () => {})

reportButton_submit.addEventListener('click', () => {
	reportPredict = false
	reportComment = reportInput.value
	WrapperAIGeneratedService.sendFeedback(currentResultId, reportPredict, reportComment)
	uiReported_false()
})

document.addEventListener('keydown', function (event) {
	if (event.code === 'Escape') {
		if (reportScreen.style.display !== 'none') {
			reportButton_close.click()
		}
	}
})

reportInput.addEventListener('change', () => {
	if (reportInput.value != '') {
		reportButton_submit.classList.remove('is-disabled')
	} else {
		reportButton_submit.classList.add('is-disabled')
	}
})

reportInput.addEventListener('input', () => {
	if (reportInput.value != '') {
		reportButton_submit.classList.remove('is-disabled')
	} else {
		reportButton_submit.classList.add('is-disabled')
	}
})

// file input


//function to check image by selected file
inputEl_fileInput.addEventListener('change', (event) => {
	if (fileSizeAllow == true) {
		const fileInput = document.querySelector('#file-input')
		const file = fileInput.files[0]
		uploadFile(file)
	} else {
		fileSizeMessage_error()
	}
})

// end file input

// drag and drop

const dropzone = document.body
const tipMessage = document.querySelector('#dropzone-fullscreen_message-tip')
const formatMessage = document.querySelector('#dropzone-fullscreen_message-format')

dropzone.addEventListener('dragover', function (event) {
	event.preventDefault()
	document.querySelector('.dropzone-fullscreen').classList.remove('hide')
})

dropzone.addEventListener('dragleave', function (event) {
	event.preventDefault()
	document.querySelector('.dropzone-fullscreen').classList.add('hide')
})

dropzone.addEventListener('drop', async function (event) {
	event.preventDefault()
	document.querySelector('.dropzone-fullscreen').classList.add('hide')

	const file = event.dataTransfer.files[0]
	const fileSize = file.size
	const maxSize = 10 * 1024 * 1024 // 10 MB in bytes

	if (fileSize > maxSize) {
		fileSizeAllow = false
		fileSizeMessage_error()
	} else {
		fileSizeAllow = true
		fileSizeMessage_ok()
	}


	if (fileSizeAllow == true && file.type === 'audio/mp3') {

		uploadFile(file)
		
	} else {
		fileSizeMessage_error()
	}
})


function uploadFile(file) {
	loadingStart()
	if (RequestCounter.isLimitExceeded()) {
		const signInModalElement = document.getElementById('sign-up')
		signInModalElement.style.display = 'flex'
		signInModalElement.style.zIndex = 100
		screen_homeShow()
		// loadingFinish()
		return
	}

	const currentImage = document.querySelector('#ai-or-not-current-image')
	currentImage.src = URL.createObjectURL(file)
	imageEl_currentImage.classList.remove('hide')
	imageEl_currentImageEmpty.classList.add('hide')

	//TODO
	alert('TODO upload file ')
	// await WrapperAIGeneratedService.getReportsByBinary(file, visitorId)
	// 	.then((response) => {
	// 		RequestCounter.increment()
	// 		changeShareUrl(response.id)
	// 		initial_dropZone()
	// 		findHighestConfidence(response.verdict)
	// 		loadingFinish(response.nsfw_detected)
	// 	})

	// 	.catch((error) => {
	// 		console.log(error)
	// 		error_dropZone()
	// 		screen_homeShow()
	// 	})
}

// end drag and drop