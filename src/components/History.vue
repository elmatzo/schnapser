<template>
  <div class="history">
    <div class="players">
      <div class="player player1">
        <div class="player-header text-right">
          &nbsp;
          <h4>{{ playerOneName }}</h4>
        </div>
      </div>
      <div class="player player2">
        <div class="player-header">
          <h4>{{ playerTwoName }}</h4>
        </div>
      </div>
    </div>
    <div v-for="game in gameHistory">
      <div class="history-scores">
        <div class="history-score-left">
          <p v-for="score in game.playerOneScores" class="h4">{{ score }}</p>
        </div>
        <div class="history-score-right">
          <p v-for="score in game.playerTwoScores" class="h4">{{ score }}</p>
        </div>
      </div>
    </div>
    <div class="score-styler">
      <div class="history-score-left"></div>
      <div class="history-score-right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['gameHistory', 'playerOneName', 'playerTwoName']
  }
</script>

<style lang="scss">
  .history-scores {
    display: flex;
    border-bottom: 2px solid #eee;
    &>div {
      width: 50%;
    }
  }
  .history-score-left {
    text-align: right;
    padding-right: 0.75em;
    border-right: 1px solid #eee;
  }
  .history-score-right {
    padding-left: 0.75em;
    border-left: 1px solid #eee;
  }
  .score-styler {
    display: flex;
    &>div {
      width: 50%;
      height: 1em;
    }
  }
</style>
