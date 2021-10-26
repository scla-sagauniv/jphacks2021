<template>
    <div class="gameDisplay">
        <h1>
            <fuwa-moji v-for="(char, i) in title" :key="i" :char="char" :index="i"></fuwa-moji>
        </h1>
        <button @click="gameStart">Start Game</button>
    </div>
</template>

<script>
  import FuwaMoji from './parts/FuwaMoji'
  import getNews from '@/getNews'
  export default {
    name: 'GameStartDisplay',
    components: {
        FuwaMoji
    },
    data() {
        return {
          title: 'Vue-Typing'.split('')
        }
    },
    methods: {
      gameStart() {
        getNews().then((res) => {
          this.$store.commit("initMondai", res)
          this.$emit('game-start')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .gameDisplay {
        width: 1200px;
        height: 450px;
        border: 5px solid #CCC;
        margin: auto;
        position: relative;
    }
    h1 {
        margin-top: 160px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        position: relative;
        display: table;
    }
</style>
