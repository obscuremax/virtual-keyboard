let section = document.createElement("section")
let textarea = document.createElement("textarea")
let div = document.createElement("div")
let help = document.createElement("div")
let keyboardObject = {
	key: {
		eng: [
			["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
			["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
			["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
			["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#9650", "Shift"],
			["Control", "Alt", " ", "Alt", "Control", "&#9668", "&#9660", "&#9658"]
		],
		engShift: [
			["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace"],
			["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"],
			["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter"],
			["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "&#9650", "Shift"],
			["Control", "Alt", " ", "Alt", "Control", "&#9668", "&#9660", "&#9658"]
		],
		ru: [
			["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
			["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\"],
			["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
			["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "&#9650", "Shift"],
			["Control", "Alt", " ", "Alt", "Control", "&#9668", "&#9660", "&#9658"]
		],
		ruShift: [
			["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace"],
			["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/"],
			["CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
			["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "&#9650", "Shift"],
			["Control", "Alt", " ", "Alt", "Control", "&#9668", "&#9660", "&#9658"]
		]
	},
	id:[
		["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
		["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
		["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
		["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
		["ControlLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
	],
	toggle: false
}
let ruButton  = keyboardObject.key.ru
let engButton = keyboardObject.key.eng
let ruShiftButton = keyboardObject.key.ruShift
let engShiftButton = keyboardObject.key.engShift

addButtons = (arr, num) => {
	return  arr.map((key, ind)=>`<button class="key" id=${keyboardObject.id[num][ind]}>${key}</button>`).join("")
}
addKeyboard = (arr) => {
	let arrBtn = arr.map((el,index)=> {
		return `<div class="line" id=line${index+1}>${addButtons(el,index)}</div>`
	} )
	arrBtn.forEach(el => div.innerHTML += el)
}
changeLanguage = (arr) => {
	div.innerHTML = "";
	addKeyboard(arr)
	return {...keyboardObject, toggle: keyboardObject.toggle = !keyboardObject.toggle}
}
changeLetterSize = (arr) => {
	div.innerHTML = "";
	addKeyboard(arr)
}
onKeyDownButton = (e) => {
	let buttonId = document.getElementById(e)
	buttonId.classList.add("active")
}
onKeyUpButton = (e) => {
	let buttonId = document.getElementById(e)
		let deleteAсtive = () => {
			buttonId.classList.remove("active")
		}
		setTimeout(deleteAсtive, 300)
}
addLetterInTextarea = (value) => {
	switch (value) {
		case "Tab":
			value = "    ";
			break;
		case "Control":
		case "Alt":
		case "Shift":
		case "CapsLock":
		case "AltGraph":
			value = "";
			break;
		case "Enter":
			value = "\n"
			break;
		case "Backspace":
			value = textarea.innerHTML.slice(0, -1)
			textarea.innerHTML = ""
			break;
		case "ArrowUp":
			value = "&#9650"
			break;
		case "ArrowLeft":
			value = "&#9668"
			break;
		case "ArrowDown":
			value = "&#9660"
			break;
		case "ArrowRight":
			value = "&#9658"
			break;
		default:
			value = value;
	}
	textarea.innerHTML += value
}

section.classList.add("section-keyboard")
div.classList.add("keyboard")
textarea.setAttribute("type", "text")

document.body.prepend(section)
section.append(textarea)
section.append(div)
help.innerHTML = "<div style='text-align: center'>Клавиатура создана в операционной системе Windows</div><div style='text-align: center'>Для переключения языка кобинация левый Alt + Shift</div>"
section.append(help)
localStorage.getItem("language") === "ru"? addKeyboard(ruButton):addKeyboard(engButton)


document.addEventListener("keydown", (e)=> {
	onKeyDownButton(e.code)
	e.stopPropagation()
	e.preventDefault()

	if (e.repeat) return

	if (e.key === "Shift") {
		 keyboardObject.toggle === false? changeLetterSize(ruShiftButton):	changeLetterSize(engShiftButton)
		document.addEventListener("keyup", (e)=>{
			onKeyUpButton(e.code)
			if (e.key === "Alt") {
				if (!keyboardObject.toggle) {
					changeLanguage(ruButton)
					localStorage.setItem("language","ru")
				} else {
					changeLanguage(engButton)
					localStorage.setItem("language","eng")
				}
			}
		})
	}
})

document.addEventListener("keyup", (e)=>{
	onKeyUpButton(e.code)
	addLetterInTextarea(e.key)
	if (e.key === "Shift") {
		keyboardObject.toggle === false? changeLetterSize(ruButton):	changeLetterSize(engButton)
	}
})

div.addEventListener("click", (e)=> {
 e.target.classList.contains("key") === true? addLetterInTextarea(e.target.innerText):""
	onKeyDownButton(e.target.id)
	onKeyUpButton(e.target.id)
})

