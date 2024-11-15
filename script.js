
const WORDS = [
	'montañas',
	'amistoso',
	'caballos',
	'ejemplar',
	'alegrías',
	'bailador',
	'cascadas',
	'florista'
]

window.onload = (event) => {
	const elements = createElement();
	const parent= document.getElementById('inputs')
	if (parent !== elements) {
        parent.appendChild(elements);
  }
	const word = WORDS[randomInt(0,7)];
	const encryptWord = xorEncryptDecrypt(word,KEY);
	const encryptedBase64 = toBase64(encryptWord);
	document.getElementById('word').setAttribute('data-word',encryptedBase64);
};

function createElement(){
	const div = document.querySelector('#inputs');
	for(let i=0;i<8;i++){
		const input = document.createElement('input');
		input.setAttribute('maxlength','1');
		input.setAttribute('id',`box${i}`);
		input.setAttribute('class',"col form-control");
		input.addEventListener('input', function () {
			moveToNext(`box${i+1}`);
		});
		input.addEventListener('keyup', function (event) {
			if (event.key === "Backspace" || event.key === "Delete") {
				moveToNext(`box${i-1}`);
			}
		});
		div.append(input);
	}
	return div;
}

function checkResult(){
	const wordElement = document.querySelector('#word');
	const inputs = Array.from(document.querySelector('#inputs').childNodes);
  const checkWord = inputs.reduce((accumulator, input) => accumulator + input.value, '').toLowerCase();
	const word = xorEncryptDecrypt(
		fromBase64(wordElement.getAttribute('data-word')),
		KEY
	)
	if(checkWord == word) alert('YOU WIN');
	let hint = '';
	for (let i = 0; i < 8; i++) {
			hint += checkWord[i] === word[i] ? checkWord[i] : '*'; 
	}
	wordElement.innerHTML = hint;
}



function moveToNext(id) {
   const nextBox = document.getElementById(id);
    if (nextBox) {
        nextBox.focus();
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Encription proccess

const KEY  = "python";
function xorEncryptDecrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}
function toBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
}


function fromBase64(text) {
    return decodeURIComponent(escape(atob(text))); 
}
