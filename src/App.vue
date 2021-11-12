<template>
  <div id="app">
      <span id="ruler" style="visibility:hidden;position:absolute;white-space:nowrap;"></span>
      <component v-bind:is="currentComponent" v-on:game-start="gameStart"></component>
  </div>
</template>

<script>
import GameDisplay from './components/GameDisplay'
import GameEndDisplay from './components/GameEndDisplay'
import GameStartDisplay from './components/GameStartDisplay'

export default {
  name: 'app',
  components: {
    GameDisplay,
    GameEndDisplay,
    GameStartDisplay
  },
  data() {
    return {
      currentComponent: GameStartDisplay
    }
  },
  computed: {
    isGameClear() {
        return this.$store.state.isGameClear
    }
  },
  watch: {
    isGameClear() {
      if (!this.isGameClear) {
        return
      }
      this.currentComponent = GameEndDisplay
    }
  },
  methods: {
    gameStart() {
      this.$store.commit('resetAll')
      this.currentComponent = GameDisplay
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
