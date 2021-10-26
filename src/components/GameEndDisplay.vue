<template>
    <div class="gameDisplay">
        <h1>Game End</h1>
        <p><font size="5">Success Stages: {{successStage}}</font></p>
        <p><font size="5">Total Type: {{totalTypeCount}}</font></p>
        <p><font size="5">Success Type: {{successTypeCount}}</font></p>
        <p><font size="5">Accuracy: {{accuracy}}%</font></p>
        <button @click="gameStart">Retry</button>
    </div>
</template>

<script>
  import getNews from '@/getNews'
  export default {
    name: 'GameEndDisplay',
    components: {},
    computed: {
      successStage() {
        return this.$store.state.successStage
      },
      totalTypeCount() {
        return this.successTypeCount + this.missTypeCount
      },
      successTypeCount() {
        return this.$store.state.typeSuccessCount
      },
      missTypeCount() {
        return this.$store.state.missCount
      },
      accuracy() {
        if (this.totalTypeCount === 0) {
            return 0
        }
        return Math.ceil((this.successTypeCount / this.totalTypeCount) * 100);
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
        margin-top: 70px;
        font-size: 60px;
    }
</style>
