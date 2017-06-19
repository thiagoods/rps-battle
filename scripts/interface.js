'use strict';

const UserInterface = (function(){

	const gameScreen = document.getElementById('app');
	const fadeAnimationDuration = 500;

	function clearGameScreen() {
		gameScreen.classList.add('fade');
		setTimeout(() => {
			while (gameScreen.firstChild) {
				gameScreen.removeChild(gameScreen.firstChild);
			}
		}, fadeAnimationDuration);
	}

	function showNewScreen(fragment) {
		setTimeout(() => {
			gameScreen.appendChild(fragment);
			gameScreen.classList.remove('fade');
		}, fadeAnimationDuration);
	}

	function callWelcome() {
		clearGameScreen();
		showGameLogo();
		let startButton = document.createElement('button');
		startButton.innerText = 'Start Game'
		startButton.classList.add('menu-button');
		startButton.addEventListener('click', () => {
			chooseGameMode();
		});
		let fragment = document.createDocumentFragment();
		fragment.appendChild(startButton);
		showNewScreen(fragment);
	}

	function chooseGameMode() {
		clearGameScreen();
		showGameLogo();
		let fragment = document.createDocumentFragment();
		let modes = GameOptions.gameModes;
		for(let i = 0, length = modes.length; i < length; i++) {
			let button = document.createElement('button');
			button.innerText = modes[i].text;
			button.setAttribute('data-players', modes[i].numPlayers);
			button.classList.add('menu-button');
			button.addEventListener('click', function(){
				Game.startNewGame(this.getAttribute('data-players'));
				callGame(this.getAttribute('data-players'));
			});
			fragment.appendChild(button);
		}
		showNewScreen(fragment);
	}

	function callGame(numPlayers) {
		if (typeof numPlayers !== 'number') {
			numPlayers = +numPlayers;
		}
		hideGameLogo();
		clearGameScreen();
		let fragment = document.createDocumentFragment();
		let callToAction = document.createElement('h1');
		callToAction.classList.add('call-to-action');
		callToAction.innerText = 'Choose your weapon...';
		fragment.appendChild(callToAction);
		let choicesBoxes = document.createElement('div');
		choicesBoxes.classList.add('boxes-wrapper');
		for(let i = 1; i <= 2; i++) {
			let choiceBox = document.createElement('div');
			choiceBox.classList.add(`box-${i}`);
			choicesBoxes.appendChild(choiceBox);
		}
		fragment.appendChild(choicesBoxes);
		let weapons = GameOptions.weapons;
		for(let i = 0, length = weapons.length; i < length; i++) {
			let choice = document.createElement('button');
			choice.classList.add('weapon-button');
			let weaponClass = `weapon-${weapons[i].name.toLowerCase()}`;
			choice.classList.add(weaponClass);
			choice.setAttribute('data-weapon', weapons[i].name);
			if(numPlayers > 0) {
				choice.addEventListener('click', function(){
					Game.playerChoice(this.getAttribute('data-weapon'));
				});
			} else {
				choice.setAttribute('disabled', true);
			}
			fragment.appendChild(choice);
		}
		showNewScreen(fragment);
		if(numPlayers === 0) {
			setTimeout(() => {
				Game.computerChoice();
			}, fadeAnimationDuration * 2);
		}
	}

	function updateChoice(player, choice) {
		let boxToUpdate = document.querySelector(`.box-${player}`);
		let img = document.createElement('img');
		img.src = choice.img;
		img.classList.add('chosen-weapon');
		boxToUpdate.appendChild(img);
	}

	function declareWinner(player, numPlayers, winningText) {
		clearGameScreen();
		let text;
		if(player === 'p1') {
			if(numPlayers === 1) {
				text = 'You win';
			} else if (numPlayers === 0) {
				text = 'Computer 1 wins'
			} else {
				text = 'Player 1 wins';
			}
		} else if (player === 'p2') {
			if(numPlayers === 1) {
				text = 'You lose';
			} else if (numPlayers === 0) {
				text = 'Computer 2 wins'
			} else {
				text = 'Player 2 wins';
			}
		} else {
			text = 'It\'s a draw';
		}
		let fragment = document.createDocumentFragment();
		if(winningText) {
			let weaponClash = document.createElement('h1');
			weaponClash.classList.add('call-to-action');
			weaponClash.innerText = winningText;
			fragment.appendChild(weaponClash);
		}
		let winnerDeclaration = document.createElement('h1');
		winnerDeclaration.classList.add('call-to-action');
		winnerDeclaration.innerText = text;
		// TODO show actual Score
		let playAgainBtn = document.createElement('button');
		playAgainBtn.classList.add('menu-button');
		playAgainBtn.innerText = 'Play Again';
		playAgainBtn.addEventListener('click', () => {
			callGame(numPlayers);
		});
		let goBackToStartBtn = document.createElement('button');
		goBackToStartBtn.classList.add('menu-button');
		goBackToStartBtn.innerText = 'Back to Start';
		goBackToStartBtn.addEventListener('click', () => {
			chooseGameMode();
		});
		fragment.appendChild(winnerDeclaration);
		fragment.appendChild(playAgainBtn);
		fragment.appendChild(goBackToStartBtn);
		showNewScreen(fragment);
	}

	function hideGameLogo() {
		let logo = document.querySelector('.logo');
		logo.style.opacity = 0;
		setTimeout(() => {
			logo.style.display = 'none';
		}, fadeAnimationDuration);
	}

	function showGameLogo() {
		let logo = document.querySelector('.logo');
		setTimeout(() => {
			logo.style.display = 'block';
		}, fadeAnimationDuration);
		setTimeout(() => {
			logo.style.opacity = 1;
		}, fadeAnimationDuration * 1.5);
	}

	return {
		callWelcome: callWelcome,
		updateChoice: updateChoice,
		declareWinner: declareWinner
	}

})();
