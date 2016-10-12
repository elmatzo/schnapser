import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as types from './mutation-types'
import {helpers} from './helpers'

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
  runningGame: helpers.getEmptyGame(),
  gameHistory: []
}

const mutations = {
  [types.DECREMENT_SCORE] (state, payload) {
    let lastScore = helpers.getCurrentScoreForPlayer(state, payload.player)
    let newScore = lastScore - payload.amount
    state.runningGame[payload.player].push(newScore < 0 ? 0 : newScore)

    helpers.handleScoreHistory(state, payload.player)
    helpers.handleSchusterLogic(state, payload.player)
  },
  [types.END_GAME] (state, payload) {
    let bummerl = 1
    if (helpers.checkForSchneider(state, payload.loser + 'Scores')) {
      bummerl = 2
      state.runningGame.schneider = true
    } else if (helpers.checkForSchuster(state, payload.winner + 'Scores')) {
      bummerl = 3
      state.runningGame.schuster = true
    }
    state.players[payload.loser].bummerl += bummerl
    state.runningGame.winner = payload.winner
  },
  [types.START_NEW_GAME] (state) {
    state.gameHistory.push(state.runningGame)
    mutations[types.RESTART_GAME](state)
  },
  [types.RESTART_GAME] (state) {
    state.runningGame = helpers.getEmptyGame()
  },
  [types.UNDO_PLAYER_SCORE] (state, payload) {
    state.runningGame[state.runningGame.scoreHistory.pop()].pop()
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
