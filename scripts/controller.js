'use strict';

const Controller = (function(){
	const UserInterface = require('./interface');
	const Game = require('./game');

	function init() {
		UserInterface.clearGameScreen();
		let welcomeScreen = UserInterface.drawWelcome(chooseGameMode);
		UserInterface.showNewScreen(welcomeScreen);
	}

	function chooseGameMode() {
		UserInterface.clearGameScreen();
		let gameModesScreen = UserInterface.drawGameModes(Game.startNewGame, gameMainScreen);
		UserInterface.showNewScreen(gameModesScreen);
	}

	function gameMainScreen(numPlayers) {
		if (typeof numPlayers !== 'number') {
			numPlayers = +numPlayers;
		}
		UserInterface.clearGameScreen();
		let mainScreen = UserInterface.drawMainGameScreen(numPlayers, Game.playerChoice, updateChoice);
		UserInterface.showNewScreen(mainScreen);
		if(numPlayers === 0) {
			setTimeout(() => {
				Game.computerChoice(updateChoice);
			}, 1500);
		}
	}

	function updateChoice(gameStatus, player, choice) {
		UserInterface.drawChoiceInBox(player, choice);
		if(player === 2) {
			let p1 = gameStatus.playersChoices.shift();
			let p2 = gameStatus.playersChoices.shift();
			setTimeout(() => {
				Game.compareChoices(p1, p2, declareWinner);
			}, 1500);
		} else {
			UserInterface.waitForOpponentFeedback(gameStatus.numPlayers);
			setTimeout(() => {
				console.log('computer playing');
				Game.computerChoice(updateChoice);
			}, 1500);
		}
	}

	function declareWinner(winner, numPlayers, winningText, score) {
		UserInterface.clearGameScreen();
		let endGameScreen = UserInterface.drawEndGameScreen(winner, numPlayers, winningText, score, gameMainScreen, chooseGameMode);
		UserInterface.showNewScreen(endGameScreen);
	}

	return {
		init: init
	};
})();

Controller.init();
