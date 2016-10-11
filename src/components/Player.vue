<template>
  <div class="player">
    <div class="player-header">
      <h4 class="player-bummerl">{{ player.bummerl }}</h4>
      <h4 class="player-name" v-if="!editMode">{{ player.name }}</h4>
      <input class="form-control input-sm player-name-input" v-model="player.name" v-else>
    </div>
    <div class="scores">
      <p v-for="score in scores" class="h4">{{ score }}</p>
    </div>
    <div v-if="gameRunning" class="score-buttons">
      <div class="btn-group btn-group-justified" role="group">
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-success" @click='decrementScore(3)' v-bind:disabled="editMode">3er</button>
        </div>
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-success" @click='decrementScore(2)' v-bind:disabled="editMode">2er</button>
        </div>
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-success" @click='decrementScore(1)' v-bind:disabled="editMode">1er</button>
        </div>
      </div>
      <button type="button" class="btn btn-default btn-sm btn-block" v-if="canUndo" @click="undo">
        <i class="fa fa-undo"></i> Undo
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['scores', 'player', 'gameRunning', 'editMode', 'canUndo'],
    methods: {
      decrementScore (amount) {
        this.$emit('decrementScore', amount)
      },
      undo () {
        this.$emit('undo')
      }
    }
  }
</script>

<style lang="scss">
  .player {
    width: 50%;
    .player-header {
      display: flex;
      justify-content: space-between;
      padding-left: 0.75em;
      padding-right: 0.75em;
      border-bottom: 2px solid #eee;
      h3 {
        margin-bottom: 0.5em;
      }
    }
    .score-buttons {
      text-align: center;
    }
    .player-name-input {
      max-width: 55%;
    }
  }
</style>
