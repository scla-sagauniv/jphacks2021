<template>
    <div class="gameDisplay" :style="style" :class="klass">
        <time-bar></time-bar>
        <mondai-string></mondai-string>
        <display-string></display-string>
        <strings></strings>
    </div>
</template>

<script>
  import Strings from './parts/Strings'
  import DisplayString from './parts/DisplayString'
  import MondaiString from './parts/MondaiString'
  import TimeBar from './parts/TimeBar'

  export default {
    name: 'GameDisplay',
    components: {
      Strings,
      DisplayString,
      MondaiString,
      TimeBar
    },
    data() {
      return {
        style: {},
        klass: []
      }
    },
    computed: {
      missCount() {
        return this.$store.state.missCount
      }
    },
    watch: {
      missCount() {
        this.klass = ['damaged']
        setTimeout(() => {
          this.klass = []
        }, 200)
      }
    }
  }
</script>

<style scoped lang="scss">
    .gameDisplay {
        width: 1000px;
        height: 700px;
        border: 5px solid #CCC;
        margin: auto;
        position: relative;
    }

    .damaged {
        animation: damage;
        animation-duration: .2s;
    }

    @keyframes damage {
        0% {
            background : #CCC;
            opacity: 0.1;
        }
        100% {
            background : #FFF;
        }
    }
</style>
