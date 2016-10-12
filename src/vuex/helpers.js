export const helpers = {
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
    let playerToCheck = helpers.getPlayerToCheck(playerThatScored)
    if (helpers.schusterIsPossible(state, playerThatScored, playerToCheck)) {
      state.runningGame.schusterPossibleFor = playerToCheck
    }
  },
  schusterIsPossible (state, playerThatScored, playerToCheck) {
    let playerThatScoredIsOnLastPoint = helpers.getCurrentScoreForPlayer(state, playerThatScored) === 1
    let playerToCheckIsOnFullPoints = helpers.getCurrentScoreForPlayer(state, playerToCheck) === 7
    return playerThatScoredIsOnLastPoint && playerToCheckIsOnFullPoints
  },
  handleScoreHistory (state, player) {
    state.runningGame.scoreHistory.push(player)
  },
  checkForSchneider (state, loser) {
    return helpers.getCurrentScoreForPlayer(state, loser) === 7
  },
  checkForSchuster (state, winner) {
    if (state.runningGame.schusterPossibleFor === winner) {
      return true
    }
    return false
  }
}
