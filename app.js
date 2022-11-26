const timeLeftDisplay = document.querySelector('#timeLeft');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#startPause');
const squares = document.querySelectorAll('.grid div');
const logLeft = document.querySelectorAll('.logLeft');
const logRight = document.querySelectorAll('.logRight');
const carLeft = document.querySelectorAll('.carLeft');
const carRight = document.querySelectorAll('.carRight');
console.log(squares);
let currentIndex = 76;
const width = 9;
let timerId;
let collision;
let currentTime = 20;

function moveFrog(e) {
	squares[currentIndex].classList.remove('frog');
	switch (e.key) {
		case 'ArrowLeft':
			if (currentIndex % width !== 0) currentIndex -= 1;
			break;
		case 'ArrowRight':
			if (currentIndex % width < width - 1) currentIndex += 1;
			break;
		case 'ArrowUp':
			if (currentIndex - width >= 0) currentIndex -= width;
			break;
		case 'ArrowDown':
			if (currentIndex + width < width * width) currentIndex += width;
			break;
	}

	squares[currentIndex].classList.add('frog');
}

function autoMoveElement() {
	currentTime--;
	timeLeftDisplay.textContent = currentTime;
	logLeft.forEach((logLeft) => moveLogLeft(logLeft));
	logRight.forEach((logRight) => moveLogRight(logRight));
	carLeft.forEach((carLeft) => moveCarLeft(carLeft));
	carRight.forEach((carRight) => moveCarRight(carRight));
}

function checkCollision() {
	lose();
	win();
}

function moveLogLeft(logLeft) {
	switch (true) {
		case logLeft.classList.contains('l1'):
			logLeft.classList.remove('l1');
			logLeft.classList.add('l2');
			break;
		case logLeft.classList.contains('l2'):
			logLeft.classList.remove('l2');
			logLeft.classList.add('l3');
			break;
		case logLeft.classList.contains('l3'):
			logLeft.classList.remove('l3');
			logLeft.classList.add('l4');
			break;
		case logLeft.classList.contains('l4'):
			logLeft.classList.remove('l4');
			logLeft.classList.add('l5');
			break;
		case logLeft.classList.contains('l5'):
			logLeft.classList.remove('l5');
			logLeft.classList.add('l1');
			break;
	}
}

function moveLogRight(logRight) {
	switch (true) {
		case logRight.classList.contains('l1'):
			logRight.classList.remove('l1');
			logRight.classList.add('l5');
			break;
		case logRight.classList.contains('l2'):
			logRight.classList.remove('l2');
			logRight.classList.add('l1');
			break;
		case logRight.classList.contains('l3'):
			logRight.classList.remove('l3');
			logRight.classList.add('l2');
			break;
		case logRight.classList.contains('l4'):
			logRight.classList.remove('l4');
			logRight.classList.add('l3');
			break;
		case logRight.classList.contains('l5'):
			logRight.classList.remove('l5');
			logRight.classList.add('l4');
			break;
	}
}

function moveCarLeft(carLeft) {
	switch (true) {
		case carLeft.classList.contains('c1'):
			carLeft.classList.remove('c1');
			carLeft.classList.add('c2');
			break;
		case carLeft.classList.contains('c2'):
			carLeft.classList.remove('c2');
			carLeft.classList.add('c3');
			break;
		case carLeft.classList.contains('c3'):
			carLeft.classList.remove('c3');
			carLeft.classList.add('c1');
			break;
	}
}

function moveCarRight(carRight) {
	switch (true) {
		case carRight.classList.contains('c1'):
			carRight.classList.remove('c1');
			carRight.classList.add('c3');
			break;
		case carRight.classList.contains('c2'):
			carRight.classList.remove('c2');
			carRight.classList.add('c1');
			break;
		case carRight.classList.contains('c3'):
			carRight.classList.remove('c3');
			carRight.classList.add('c2');
			break;
	}
}

function lose() {
	if (
		squares[currentIndex].classList.contains('c1') ||
		squares[currentIndex].classList.contains('l4') ||
		squares[currentIndex].classList.contains('l5') ||
		currentTime <= 0
	) {
		resultDisplay.textContent = 'Refresh to try again';
		clearInterval(timerId);
		clearInterval(collision);
		squares[currentIndex].classList.remove('frog');
		document.removeEventListener('keyup', moveFrog);
	}
}

function win() {
	if (squares[currentIndex].classList.contains('endGame')) {
		resultDisplay.textContent = 'You Win!';
		clearInterval(timerId);
		document.removeEventListener('keyup', moveFrog);
	}
}

startPauseBtn.addEventListener('click', () => {
	if (timerId) {
		clearInterval(timerId);
		clearInterval(collision);
		collision = null;
		timerId = null;
		document.removeEventListener('keyup', moveFrog);
	} else {
		timerId = setInterval(autoMoveElement, 1000);
		collision = setInterval(checkCollision, 50);
		document.addEventListener('keyup', moveFrog);
	}
});
