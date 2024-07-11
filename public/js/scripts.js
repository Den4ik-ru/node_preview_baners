async function openBaner(vals) {
	startHref = location.href
	const queryString = startHref
	const regex = /([a-z]+)=([^&]+)/g;
	const params = {};
	let match;
	while ((match = regex.exec(queryString)) !== null) {
		params[match[1]] = match[2];
	}
	if (startHref !== undefined) {
		god = params["god"]
	}
	let mes = ""
	if (startHref !== undefined) {
		mes = params["mes"]
	}
	let com = ""
	if (startHref !== undefined) {
		com = params["com"]
	}
	let val = ""
	if (startHref !== undefined) {
		val = params["val"]
	}
	let tov = ""
	if (startHref !== undefined) {
		tov = params["tov"]
	}
	let plo = ""
	if (startHref !== undefined) {
		plo = params["plo"]
	}
	let ban = ""
	if (startHref !== undefined) {
		ban = params["ban"]
	}
	let href = `/b/${god}/${mes}/${com}/${val}/${tov}/${plo}/${vals}/index.html`
	return href
}

async function openYaer(vals) {
	console.log("getContent");
	try {
		let hr = ""
		let href = location.href
		if (href.includes("&I=")){
			href = href.split("&I=")[0]
		}
		if (href.includes("ban=")){
			hr = href
		}else {
			if (href.includes("plo=")) {
				hr = `${href}&ban=${vals}`
			} else {

				if (location.href.includes("tov=")) {
					hr = `${href}&plo=${vals}`

				} else {

					if (location.href.includes("val=")) {
						hr = `${href}&tov=${vals}`

					} else {
						if (location.href.includes("com=")) {
							hr = `${href}&val=${vals}`

						} else {
							if (location.href.includes("mes=")) {
								hr = `${href}&com=${vals}`

							} else {

								if (location.href.includes("god=")) {
									hr = `${href}&mes=${vals}`
								} else {
									startHref = 'http://127.0.0.1:3000/openyaer?'
									hr = `${startHref}god=${vals}`
								}
							}
						}
					}
				}
			}
		}
		hr = hr+"&I=0"
		window.location.href = hr+""
	} catch (error) {
		console.error('Ошибка:', error);
	}
}


async function remPoz(vals) {
	console.log("Удалить позицию");
	try {
		let hr = ""
		let href = location.href
		if (href.includes("&I=")){
			href = href.split("&I=")[0]
		}
		if (href.includes("ban=")){
			hr = `${href}&file=${vals}`
		}else {
			if (href.includes("plo=")) {
				hr = `${href}&ban=${vals}`
			} else {

				if (location.href.includes("tov=")) {
					hr = `${href}&plo=${vals}`

				} else {

					if (location.href.includes("val=")) {
						hr = `${href}&tov=${vals}`

					} else {
						if (location.href.includes("com=")) {
							hr = `${href}&val=${vals}`

						} else {
							if (location.href.includes("mes=")) {
								hr = `${href}&com=${vals}`

							} else {

								if (location.href.includes("god=")) {
									hr = `${href}&mes=${vals}`
								} else {
									startHref = 'http://127.0.0.1:3000/openyaer?'
									hr = `${startHref}god=${vals}`
								}
							}
						}
					}
				}
			}
		}
		hr =  hr.replace('/openyaer?', "/rempoz?")
		window.location.href = hr
	} catch (error) {
		console.error('Ошибка:', error);
	}
}


async function rename(namefile) {

	const name = prompt('Новое имя', namefile);
	const vals = namefile
	let hr = ""
	let href = location.href
	if (href.includes("&I=")){
		href = href.split("&I=")[0]
	}
	if (href.includes("ban=")){
		hr = `${href}&file=${vals}`
	}else {
		if (href.includes("plo=")) {
			hr = `${href}&ban=${vals}`
		} else {
			if (location.href.includes("tov=")) {
				hr = `${href}&plo=${vals}`
			} else {
				if (location.href.includes("val=")) {
					hr = `${href}&tov=${vals}`
				} else {
					if (location.href.includes("com=")) {
						hr = `${href}&val=${vals}`
					} else {
						if (location.href.includes("mes=")) {
							hr = `${href}&com=${vals}`
						} else {
							if (location.href.includes("god=")) {
								hr = `${href}&mes=${vals}`
							} else {
								startHref = 'http://127.0.0.1:3000/rename?'
								hr = `${startHref}god=${vals}`
							}
						}
					}
				}
			}
		}
	}
	if(/[А-яЁё]+$/.test(name) === false) {
		hr =  hr.replace('/openyaer?', "/rename?")
		hr = hr +"&newName="+name
		window.location.href = hr
	}else {
		alert("Русский язык не поддерживается")
	}
}


async function save(namefile) {
	const vals = namefile
	let hr = location.href
	let href = location.href
	if (href.includes("&I=")){
		href = href.split("&I=")[0]
	}
	if (vals !== "") {
		if (href.includes("ban=")) {
			hr = `${href}&file=${vals}`
		} else {
			if (href.includes("plo=")) {
				hr = `${href}&ban=${vals}`
			} else {
				if (location.href.includes("tov=")) {
					hr = `${href}&plo=${vals}`
				} else {
					if (location.href.includes("val=")) {
						hr = `${href}&tov=${vals}`
					} else {
						if (location.href.includes("com=")) {
							hr = `${href}&val=${vals}`
						} else {
							if (location.href.includes("mes=")) {
								hr = `${href}&com=${vals}`
							} else {
								if (location.href.includes("god=")) {
									hr = `${href}&mes=${vals}`
								} else {
									startHref = 'http://127.0.0.1:3000/openyaer?'
									hr = `${startHref}god=${vals}`
								}
							}
						}
					}
				}
			}
		}
	}
	hr =  hr.replace('/openyaer?', "/save?")
	window.location.href = hr
}


async function openYaerPlys(vals) {
	n = document.getElementsByClassName("bane").length
	if (0<= parseInt(location.href.split("&I=")[1],10)+ parseInt(vals,10)) {
		if (n - 1 >= parseInt(location.href.split("&I=")[1], 10) + parseInt(vals, 10)) {
			let href = location.href
			const nStran = parseInt(location.href.split("&I=")[1], 10) + parseInt(vals, 10)
			window.location.href = location.href.split("&I=")[0] + "&I=" + nStran.toString()
		}else {
			document.getElementById("strelcaRigh").style.opacity = "0.0";
			document.getElementById("strelcaRigh").style.cursor = "not-allowed";
		}
	}else {
		document.getElementById("strelcaLeft").style.opacity = "0.0";
		document.getElementById("strelcaLeft").style.cursor = "not-allowed";
	}
}


async function copySsilku(vals) {
	navigator.clipboard.writeText(location.host+vals)
		.then(() => {
			document.getElementById("referalka").style.backgroundColor = "#999999";
			document.getElementById("referalka").innerText = "Скопировано"
			let timerId = setTimeout(() => {
				// document.getElementById("referalka").innerText = ""
				document.getElementById("referalka").style.backgroundColor = "white";
			}, 1000);
		})
		.catch(err => {
			console.log('Something went wrong', err);
		});
}


document.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'ArrowUp':
			openYaerPlys(-10)
			break;
		case 'ArrowDown':
			openYaerPlys(10)
			break;
		case 'ArrowLeft':
			openYaerPlys(-1)
			break;
		case 'ArrowRight':
			openYaerPlys(1)
			break;
	}
	if (event.key === 'ArrowRight') {
		console.log('Кнопка со стрелкой вправо нажата!');
	}
});


let timerId = setInterval(() => {
	try {
		if (document.getElementsByClassName('container')[0].innerHTML.includes(document.getElementsByName("filedata")[0].files[0].name) === true) {
			document.getElementById('sendFile').style.display = 'inline-block';
			document.getElementById('sendFile1').value = "Перезаписать!"
			document.getElementById('sendFile').style.backgroundColor = 'red';
		}
	}catch (e) {}

	try {
		if (document.getElementsByClassName('container')[0].innerHTML.includes(document.getElementsByName("filedata")[0].files[0].name) === false) {
			document.getElementById('sendFile').style.display = 'inline-block';
			document.getElementById('sendFile1').value = "Загрузить"
			document.getElementById('sendFile').style.backgroundColor = 'white';
		}

	}catch (e) {}
}, 500);

document.querySelector("html").classList.add('js');

var fileInput  = document.querySelector( ".input-file" ),
	button     = document.querySelector( ".input-file-trigger" ),
	the_return = document.querySelector(".file-return");

setTimeout(() => {
	if (window.innerWidth > 1000){
		document.getElementById('column1').style.display = 'block';
	}else {
		document.getElementById('razvern').style.display = 'block';
	}
}, 100);


function razvern() {
	ss = document.getElementById('column1').style.display
	if(ss === 'none'){
		document.getElementById('column1').style.display = 'block'
		document.getElementById('column2').style.display = 'none'
		document.getElementsByClassName('listy')[0].style.display = 'none'
		document.getElementsByClassName('listy')[1].style.display = 'none'
	}else{
		document.getElementById('column1').style.display = 'none'
		document.getElementById('column2').style.display = 'block'
		document.getElementsByClassName('listy')[0].style.display = 'block'
		document.getElementsByClassName('listy')[1].style.display = 'block'
	}
}


function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		...options
	};
	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}
	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}
	document.cookie = updatedCookie;
}

function setCookies(){
	setCookie('admin', '', {'max-age': -1});
	setCookie('has', '', {'max-age': -1})
	window.location = window.location
}