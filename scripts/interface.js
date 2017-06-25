const GameOptions = require('./gameOptions');

'use strict';

module.exports = {

	gameScreen: document.getElementById('app'),
	fadeAnimationDuration: 500,

	clearGameScreen() {
		this.gameScreen.classList.add('fade');
		setTimeout(() => {
			this.gameScreen = this.gameScreen;
			while (this.gameScreen.firstChild) {
				let removedObj = this.gameScreen.removeChild(this.gameScreen.firstChild);
				removedObj = null;
			}
		}, this.fadeAnimationDuration);
	},

	showNewScreen(fragment) {
		setTimeout(() => {
			this.gameScreen.appendChild(fragment);
			this.gameScreen.classList.remove('fade');
			fragment = null;
		}, this.fadeAnimationDuration);
	},

	drawWelcome(startFunction) {
		this.showGameLogo();
		let startButton = document.createElement('button');
		startButton.innerText = 'Start Game';
		startButton.classList.add('menu-button');
		startButton.addEventListener('click', () => {
			startFunction();
		});
		let fragment = document.createDocumentFragment();
		fragment.appendChild(startButton);
		return fragment;
	},

	drawGameModes(startGameLogicFunction, startGameInterfaceFunction) {
		this.showGameLogo();
		let fragment = document.createDocumentFragment();
		let modes = GameOptions.gameModes;
		modes.map(function(mode){
			let button = document.createElement('button');
			button.innerText = mode.text;
			button.setAttribute('data-players', mode.numPlayers);
			button.classList.add('menu-button');
			button.addEventListener('click', function(){
				startGameLogicFunction(this.getAttribute('data-players'));
				startGameInterfaceFunction(this.getAttribute('data-players'));
			});
			fragment.appendChild(button);
		});
		return fragment;
	},

	drawMainGameScreen(numPlayers, playerChoiceSelectFunction, updateChoiceFunction) {
		if (typeof numPlayers !== 'number') {
			numPlayers = +numPlayers;
		}
		this.hideGameLogo();
		let fragment = document.createDocumentFragment();
		let callToAction = document.createElement('h1');
		callToAction.classList.add('call-to-action');
		if (numPlayers > 0) {
			callToAction.innerText = 'Choose your weapon!';
		} else {
			callToAction.innerText = 'Computer 1 is thinking';
		}
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
		weapons.map(function(weapon){
			let choice = document.createElement('button');
			choice.classList.add('weapon-button');
			let weaponClass = `weapon-${weapon.name.toLowerCase()}`;
			choice.classList.add(weaponClass);
			choice.setAttribute('data-weapon', weapon.name);
			let choiceLabel = document.createElement('span');
			choiceLabel.classList.add('weapon-button-label');
			choiceLabel.innerText = weapon.name;
			choice.appendChild(choiceLabel);
			if(numPlayers > 0) {
				choice.addEventListener('click', function(){
					if(!this.getAttribute('disabled')) {
						playerChoiceSelectFunction(this.getAttribute('data-weapon'), updateChoiceFunction);
						let allChoicesNodeList = document.querySelectorAll('.weapon-button');
						let allChoicesArray = Array.prototype.slice.apply(allChoicesNodeList);
						allChoicesArray.map(function(choice){
							choice.setAttribute('disabled', true);
						});
					}
				});
			} else {
				choice.setAttribute('disabled', true);
			}
			fragment.appendChild(choice);
		});
		return fragment;
	},

	drawChoiceInBox(player, choice) {
		let boxToUpdate = document.querySelector(`.box-${player}`);
		let img = document.createElement('img');
		img.src = choice.img;
		img.classList.add('chosen-weapon');
		let boxLabel = document.createElement('span');
		boxLabel.classList.add('box-label');
		boxLabel.innerText = choice.name;
		boxToUpdate.appendChild(img);
		boxToUpdate.appendChild(boxLabel);
	},

	waitForOpponentFeedback(numPlayers) {
		if (typeof numPlayers !== 'number') {
			numPlayers = +numPlayers;
		}
		let callToAction = document.querySelector('.call-to-action');
		if (numPlayers > 0) {
			callToAction.innerText = 'Wait for your opponent';
		} else {
			callToAction.innerText = 'Computer 2 is thinking';
		}
	},

	drawEndGameScreen(winner, numPlayers, winningText, score, playAgainFunction, backToStartFunction) {
		if (typeof numPlayers !== 'number') {
			numPlayers = +numPlayers;
		}
		let text;
		if(winner === 'p1') {
			if(numPlayers === 1) {
				text = 'You win';
			} else if (numPlayers === 0) {
				text = 'Computer 1 wins';
			} else {
				text = 'Player 1 wins';
			}
		} else if (winner === 'p2') {
			if(numPlayers === 1) {
				text = 'You lose';
			} else if (numPlayers === 0) {
				text = 'Computer 2 wins';
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
		let scoreBox = document.createElement('div');
		scoreBox.classList.add('scorebox');
		for(let i = 1; i <= 2; i++) {
			let key = `p${i}`;
			let playerScore = document.createElement('div');
			playerScore.classList.add('score');
			playerScore.innerHTML = `${key.toUpperCase()}<br/>${score[key]}`;
			scoreBox.appendChild(playerScore);
			if(i ===1) {
				let versus = document.createElement('div');
				versus.innerText = 'X';
				scoreBox.appendChild(versus);
			}
		}
		let playAgainBtn = document.createElement('button');
		playAgainBtn.classList.add('menu-button');
		playAgainBtn.innerText = 'Play Again';
		playAgainBtn.addEventListener('click', () => {
			playAgainFunction(numPlayers);
		});
		let goBackToStartBtn = document.createElement('button');
		goBackToStartBtn.classList.add('menu-button');
		goBackToStartBtn.innerText = 'Back to Start';
		goBackToStartBtn.addEventListener('click', () => {
			backToStartFunction();
		});
		fragment.appendChild(winnerDeclaration);
		fragment.appendChild(scoreBox);
		fragment.appendChild(playAgainBtn);
		fragment.appendChild(goBackToStartBtn);
		return fragment;
	},

	hideGameLogo() {
		let logo = document.querySelector('.logo');
		logo.style.opacity = 0;
		setTimeout(() => {
			logo.style.display = 'none';
		}, this.fadeAnimationDuration);
	},

	showGameLogo() {
		let logo = document.querySelector('.logo');
		setTimeout(() => {
			logo.style.display = 'block';
		}, this.fadeAnimationDuration);
		setTimeout(() => {
			logo.style.opacity = 1;
		}, this.fadeAnimationDuration * 1.5);
	},

};
