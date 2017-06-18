'use strict';

let userInterface = (function(){
	return {
		initWelcome: function() {
			let logo = document.createElement('img');
			logo.src = './images/logo.svg';
			logo.classList.add('logo');
			let startButton = document.createElement('button');
			startButton.innerText = 'Start Game'
			startButton.classList.add('start-button');
			startButton.addEventListener('click', () => {
				this.chooseGameMode();
			});
			let fragment = document.createDocumentFragment();
			fragment.appendChild(logo);
			fragment.appendChild(startButton);
			document.getElementById('app').appendChild(fragment);
		},
		chooseGameMode: function() {
			console.log('choose game mode');
		}
	}
})();
