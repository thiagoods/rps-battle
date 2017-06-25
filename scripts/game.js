const GameOptions = require('./gameOptions');

'use strict';

let gameStatus = {
	score: {'p1': 0, 'p2':0},
	numPlayers: 0,
	playersChoices: []
};

module.exports = {

	startNewGame(numPlayers) {
		if (typeof numPlayers !== 'number') {
			numPlayers = +numPlayers;
		}
		gameStatus.score = {p1: 0, p2: 0};
		gameStatus.numPlayers = numPlayers;
	},

	playerChoice(choice, updateChoiceFunction) {
		let weaponsList = GameOptions.weapons;
		let choiceObj;
		for(let i = 0, length = weaponsList.length; i < length; i++ ) {
			if(choice === weaponsList[i].name) {
				choiceObj = weaponsList[i];
				break;
			}
		}
		if(choiceObj !== undefined) {
			gameStatus.playersChoices.push(choiceObj);
			let player = gameStatus.playersChoices.length;
			updateChoiceFunction(gameStatus, player, choiceObj);
		} else {
			console.log('Weapon unavailable. Changing to random weapon');
		}
	},

	computerChoice(updateChoiceFunction) {
		let choice = Math.floor(Math.random() * GameOptions.weapons.length);
		let choiceObj = GameOptions.weapons[choice];
		gameStatus.playersChoices.push(choiceObj);
		let player = gameStatus.playersChoices.length;
		updateChoiceFunction(gameStatus, player, choiceObj);
	},

	compareChoices(p1Choice, p2Choice, winnerSettingFunction) {
		let numPlayers = gameStatus.numPlayers;
		if(p1Choice.name === p2Choice.name) {
			winnerSettingFunction('draw', numPlayers, false, gameStatus.score);
		} else if (p1Choice.wins === p2Choice.name) {
			this.setVictory('p1');
			let winningText = `${p1Choice.name} beats ${p2Choice.name}`;
			winnerSettingFunction('p1', numPlayers, winningText, gameStatus.score);
		} else {
			this.setVictory('p2');
			let winningText = `${p2Choice.name} beats ${p1Choice.name}`;
			winnerSettingFunction('p2', numPlayers, winningText, gameStatus.score);
		}
	},

	setVictory(player) {
		gameStatus.score[player]++;
	},

};
