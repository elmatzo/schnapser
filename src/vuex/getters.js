export const runningGame = state => state.runningGame

export const winnerName = state => state.players[state.runningGame.winner].name

export const gameHistory = state => state.gameHistory

export const playerOne = state => state.players.playerOne

export const playerTwo = state => state.players.playerTwo
