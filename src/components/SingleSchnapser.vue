<template>
  <div class="single-schnapser">
    <div class="btn-group btn-group-justified" role="group" v-if="!editMode && !showHistory">
      <div class="btn-group btn-group-xs" role="group">
        <button type="button" class="btn btn-default" @click="editMode = true">
          <i class="fa fa-pencil-square-o fa-lg"></i> Player Names
        </button>
      </div>
      <div class="btn-group btn-group-xs" role="group" @click="showHistory = true">
        <button type="button" class="btn btn-default">
          <i class="fa fa-book fa-lg"></i> History
        </button>
      </div>
      <div class="btn-group btn-group-xs" role="group" @click="restartGame">
        <button type="button" class="btn btn-default">
          <i class="fa fa-undo fa-lg"></i> Restart Bummerl
        </button>
      </div>
    </div>
    <div v-if="editMode">
      <button class="btn btn-success btn-block btn-xs" @click="editMode = false" v-bind:disabled="playerOne.name === '' || playerTwo.name === ''">
        <i class="fa fa-check fa-lg"></i> Done
      </button>
    </div>
    <div v-if="showHistory">
      <button class="btn btn-success btn-block btn-xs" @click="showHistory = false" v-bind:disabled="playerOne.name === '' || playerTwo.name === ''">
        <i class="fa fa-arrow-left fa-lg"></i> Back
      </button>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div class="players" v-if="!showHistory">
        <player class="player1"
          :scores=runningGame.playerOneScores
          :player=playerOne
          v-on:decrementScore="decrementPlayerOneScores"
          v-on:undo="undoPlayerOne"
          :gameRunning=gameRunning
          :editMode=editMode
          :canUndo=canUndoPlayerOne
        >
        </player>
        <player class="player2"
          :scores=runningGame.playerTwoScores
          :player=playerTwo
          v-on:decrementScore="decrementPlayerTwoScores"
          v-on:undo="undoPlayerTwo"
          :gameRunning=gameRunning
          :editMode=editMode
          :canUndo=canUndoPlayerTwo
        >
        </player>
      </div>
      <history
        :gameHistory=gameHistory
        :playerOneName=playerOne.name
        :playerTwoName=playerTwo.name
        v-else
      >
      </history>
    </transition>
    <div class="new" v-if="!gameRunning">
      <h4 v-if="runningGame.schneider"><b>Schneider!</b></h4>
      <h4><b>{{ winnerName }}</b> hat gewonnen!</h4>
      <button class="btn btn-success" @click="startNewGame">neues Bummerl</button>
    </div>
  </div>
</template>

<script>
  import Player from './Player.vue'
  import History from './History.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: { Player, History },
    data () {
      return {
        gameRunning: true,
        editMode: false,
        showHistory: false
      }
    },
    computed: {
      ...mapGetters([
        'runningGame',
        'winnerName',
        'gameHistory',
        'playerOne',
        'playerTwo'
      ]),
      canUndoPlayerOne () {
        return this.canUndo('playerOneScores')
      },
      canUndoPlayerTwo () {
        return this.canUndo('playerTwoScores')
      }
    },
    methods: {
      decrementPlayerOneScores (amount) {
        this.$store.commit('decrementScore', {
          player: 'playerOneScores',
          amount
        })
        if (this.runningGame.playerOneScores[this.runningGame.playerOneScores.length - 1] <= 0) {
          this.finishGame('playerTwo', 'playerOne')
        }
      },
      decrementPlayerTwoScores (amount) {
        this.$store.commit('decrementScore', {
          player: 'playerTwoScores',
          amount
        })
        if (this.runningGame.playerTwoScores[this.runningGame.playerTwoScores.length - 1] <= 0) {
          this.finishGame('playerOne', 'playerTwo')
        }
      },
      finishGame (loser, winner) {
        this.gameRunning = false
        this.$store.commit('endGame', {
          loser,
          winner
        })
      },
      startNewGame () {
        this.$store.commit('startNewGame')
        this.gameRunning = true
      },
      restartGame () {
        this.$store.commit('restartGame')
        this.gameRunning = true
      },
      canUndo (player) {
        let scoreHistory = this.runningGame.scoreHistory
        let scoreHistoryLength = scoreHistory.length
        if (scoreHistoryLength > 0) {
          return scoreHistory[scoreHistoryLength - 1] === player
        }
        return false
      },
      undoPlayerOne () {
        this.undo('playerOneScores')
      },
      undoPlayerTwo () {
        this.undo('playerTwoScores')
      },
      undo (player) {
        this.$store.commit('undoPlayerScore', {player})
      }
    }
  }
</script>

<style lang="scss">
  .players {
    margin-top: 1em;
    display: flex;
    .player1 {
      border-right: 1px solid #eee;
      .scores p {
        text-align: right;
        padding-right: 0.75em;
      }
      .player-name-input {
        text-align: right;
      }
    }
    .player2 {
      border-left: 1px solid #eee;
      .player-name{
        order: 0;
      }
      .player-bummerl{
        order: 1;
      }
      .scores p {
        text-align: left;
        padding-left: 0.75em;
      }
    }
  }
  .new {
    margin-top: 0.5em;
    text-align: center;
  }
  .slide-fade-enter-active {
    transition: all .1s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    padding-left: 10px;
    opacity: 0;
  }
</style>
