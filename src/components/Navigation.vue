<template>
  <header>
    <nav class="navbar navbar-default navbar-static-top" style="margin-bottom: 0;">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand">Umbaldo Schnapser</router-link>
        </div>
      </div>
    </nav>
    <nav class="navbar navbar-default navbar-static-top">
      <div class="game-nav">
        <div class="game-nav-element">
          <router-link to="/" exact class="navbar-brand">Single</router-link>
        </div>
        <div class="game-nav-element">
          <router-link to="/bauer" class="navbar-brand">Bauer</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  .navbar-header {
    display: flex;
    justify-content: center;
  }
  .game-nav {
    display: flex;
  }
  .game-nav-element {
    display: flex;
    justify-content: center;
    width: 50%;
    a {
      text-align: center;
      width: 100%;
    }
  }
  .game-nav-element .router-link-active {
    background-color: #1a242f;
    &:hover, &:active, &:focus {
      background-color: #1a242f;
    }
  }
</style>
