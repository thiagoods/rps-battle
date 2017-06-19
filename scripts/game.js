'use script'

const Game = (function(){

	let gameStatus = {
		score: {p1: 0, p2:0},
		numPlayers: 0,
		playersChoices: []
	};

	function getScore() {
		return gameStatus.score;
	}

	function newRound() {
		gameStatus.playersChoices = [];
	}

	function startNewGame(numPlayers) {
		if (typeof numPlayers !== 'number') {
			numPlayers = +numPlayers;
		}
		gameStatus.score = {p1: 0, p2: 0};
		gameStatus.numPlayers = numPlayers;
	}

	function playerChoice(choice) {
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
			UserInterface.updateChoice(player, choiceObj);
		} else {
			console.log('Weapon unavailable. Changing to random weapon');
		}
		if (gameStatus.numPlayers === 1) {
			computerChoice();
		}
	}

	function computerChoice() {
		let choice = Math.floor(Math.random() * GameOptions.weapons.length);
		let choiceObj = GameOptions.weapons[choice];
		gameStatus.playersChoices.push(choiceObj);
		let player = gameStatus.playersChoices.length;
		UserInterface.updateChoice(player, choiceObj);
		if(gameStatus.playersChoices.length === 2) {
			let p1 = gameStatus.playersChoices.shift();
			let p2 = gameStatus.playersChoices.shift();
			setTimeout(() => {
				compareChoices(p1, p2);
			}, 2000);
		} else {
			setTimeout(() => {
				console.log('computer playing');
				computerChoice();
			}, 1000);
		}
	}

	function compareChoices(p1Choice, p2Choice) {
		let numPlayers = gameStatus.numPlayers;
		if(p1Choice.name === p2Choice.name) {
			UserInterface.declareWinner('draw', numPlayers);
		} else if (p1Choice.wins === p2Choice.name) {
			setVictory('p1');
			let winningText = `${p1Choice.name} beats ${p2Choice.name}`;
			UserInterface.declareWinner('p1', numPlayers, winningText);
		} else {
			setVictory('p2');
			let winningText = `${p2Choice.name} beats ${p1Choice.name}`;
			UserInterface.declareWinner('p2', numPlayers, winningText);
		}
	}

	function setVictory(player) {
		gameStatus.score[player]++;
	}

	return {
		getScore: getScore,
		startNewGame: startNewGame,
		computerChoice: computerChoice,
		playerChoice: playerChoice
	};
})();
