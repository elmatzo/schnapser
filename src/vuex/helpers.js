export default {
  getEmptyGame () {
    return {
      winner: null,
      schusterPossibleFor: null,
      schneider: false,
      schuster: false,
      playerOneScores: [7],
      playerTwoScores: [7],
      scoreHistory: []
    }
  },
  getCurrentScoreForPlayer (state, player) {
    return state.runningGame[player][state.runningGame[player].length - 1]
  },
  getPlayerToCheck (playerThatScored) {
    if (playerThatScored === 'playerOneScores') {
      return 'playerTwoScores'
    }
    return 'playerOneScores'
  },
  handleSchusterLogic (state, playerThatScored) {
    let playerToCheck = this.getPlayerToCheck(playerThatScored)
    if (this.schusterIsPossible(state, playerThatScored, playerToCheck)) {
      state.runningGame.schusterPossibleFor = playerToCheck
    }
  },
  schusterIsPossible (state, playerThatScored, playerToCheck) {
    let playerThatScoredIsOnLastPoint = this.getCurrentScoreForPlayer(state, playerThatScored) === 1
    let playerToCheckIsOnFullPoints = this.getCurrentScoreForPlayer(state, playerToCheck) === 7
    return playerThatScoredIsOnLastPoint && playerToCheckIsOnFullPoints
  },
  handleScoreHistory (state, player) {
    state.runningGame.scoreHistory.push(player)
  },
  checkForSchneider (state, loser) {
    return this.getCurrentScoreForPlayer(state, loser) === 7
  },
  checkForSchuster (state, winner) {
    if (state.runningGame.schusterPossibleFor === winner) {
      return true
    }
    return false
  }
}
