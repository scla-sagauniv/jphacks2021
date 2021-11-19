<template>
  <div id="app">
      <loading v-show="loading"></loading>
      <span v-show="!loading" id="ruler" style="visibility:hidden;position:absolute;white-space:nowrap;"></span>
      <div class="left-wall"></div>
      <component v-show="!loading" v-bind:is="currentComponent" v-on:game-start="gameStart"></component>
      <div class="right-wall"></div>
  </div>
</template>

<script>
import GameDisplay from './components/GameDisplay'
import GameEndDisplay from './components/GameEndDisplay'
import GameStartDisplay from './components/GameStartDisplay'
import Loading from './components/Loading.vue'

export default {
  name: 'app',
  components: {
    GameDisplay,
    GameEndDisplay,
    GameStartDisplay,
    Loading
  },
  data() {
    return {
      currentComponent: GameStartDisplay,
      loading: true
    }
  },
  mounted() {  
    const url = 'https://tatakimaru.herokuapp.com/';
    fetch(url).then((res) => {
      if (res.status === 200) {
        this.loading = false
      }
    })
  },
  computed: {
    isGameClear() {
        return this.$store.state.isGameClear
    },
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
    },
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
  margin-top: 40px;
  display:flex;
}
.left-wall {
  width: 350px;
  height: 800px;
  background-color: white;
  z-index: 3;
}
.right-wall {
  width: 350px;
  height: 800px;
  background-color: white;
  z-index: 3;
}
</style>
