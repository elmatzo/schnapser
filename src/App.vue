<template>
  <div id="app">
    <navigation></navigation>
    <div class="container">
      <game></game>
    </div>
  </div>
</template>

<script>
import Game from './components/Game'
import Navigation from './components/Navigation'

export default {
  components: {
    Game,
    Navigation
  }
}
</script>

<style>
</style>
