import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  players: {
    playerOne: {
      name: 'Player1',
      bummerl: 0
    },
    playerTwo: {
      name: 'Player2',
      bummerl: 0
    }
  },
  runningGame: {
    winner: null,
    schneider: false,
    playerOneScores: [7],
    playerTwoScores: [7],
    scoreHistory: []
  },
  gameHistory: []
}

const mutations = {
  decrementScore (state, payload) {
    let lastScore = state.runningGame[payload.player][state.runningGame[payload.player].length - 1]
    let newScore = lastScore - payload.amount
    mutations.handleScoreHistory(state, payload.player)
    state.runningGame[payload.player].push(newScore < 0 ? 0 : newScore)
  },
  handleScoreHistory (state, player) {
    state.runningGame.scoreHistory.push(player)
  },
  endGame (state, payload) {
    let bummerl = 1
    if (state.runningGame.playerOneScores[state.runningGame.playerOneScores.length - 1] === 7 ||
      state.runningGame.playerTwoScores[state.runningGame.playerTwoScores.length - 1] === 7) {
      bummerl = 2
      state.runningGame.schneider = true
    }
    state.players[payload.loser].bummerl += bummerl
    state.runningGame.winner = payload.winner
  },
  startNewGame (state) {
    state.gameHistory.push(state.runningGame)
    mutations.restartGame(state)
  },
  restartGame (state) {
    state.runningGame = {
      winner: null,
      schneider: false,
      playerOneScores: [7],
      playerTwoScores: [7],
      scoreHistory: []
    }
  },
  undoPlayerScore (state, payload) {
    state.runningGame[state.runningGame.scoreHistory.pop()].pop()
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
