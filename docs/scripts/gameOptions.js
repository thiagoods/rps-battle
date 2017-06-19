'use strict';

const GameOptions = {
	gameModes: [
		{ text: 'Player vs Computer', numPlayers: 1},
		{ text: 'Computer vs Computer', numPlayers: 0}
	],
	weapons: [
		{ name: 'Rock', img: './images/rock.svg', wins: 'Scissors'},
		{ name: 'Paper', img: './images/paper.svg', wins: 'Rock'},
		{ name: 'Scissors', img: './images/scissors.svg', wins: 'Paper'}
	]
};


