<template>
  <span v-if="word_map.ruby" v-bind:class="klass" :style="style"><ruby>{{word_map.word}}<rt>{{word_map.ruby}}</rt></ruby></span>
  <span v-else v-bind:class="klass" :style="style">{{word_map.word}}</span>
</template>

<script>
  export default {
    name: 'Strings',
    props: ['char_map', 'index'],
    data() {
      return {
        style: {
          color: this.color
        },
        klass: [],
        word_map: {word: null, ruby: null}
      }
    },
    mounted() {
      const isOdd = (this.index&1) === 1
      if (isOdd) {
        this.klass = ['fuwa']
      } else {
        this.klass = ['fuwa2']
      }
      if (this.char_map.word === " ") {
        this.word_map.word = "･";
        this.word_map.ruby = undefined;
        this.klass.push("-is-space")
      }
      else if (this.char_map.word === "　") {
        this.word_map.word = "〇";
        this.word_map.ruby = undefined;
        this.klass.push("-is-space")
      }
      else {
        this.word_map.word = this.char_map.word
        this.word_map.ruby = this.char_map.ruby;
      }
    }
  }
</script>

<style scoped lang="scss">
    span {
        display:inline-block;
    }
    .fuwa {
        animation: fuwa;
        animation-duration: 8s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-out;
        font-size: 80px;
    }
    .fuwa2 {
        animation: fuwa2;
        animation-duration: 8s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-out;
        font-size: 80px;
    }
    @keyframes fuwa {
        0% {transform: translate(0, 3px) rotate(-5deg);}
        50% {transform: translate(0, -3px) rotate(5deg);}
        100% {transform: translate(0, 3px) rotate(-5deg);}
    }
    @keyframes fuwa2 {
        0% {transform: translate(0, -3px) rotate(5deg);}
        50% {transform: translate(0, 3px) rotate(-5deg);}
        100% {transform: translate(0, -3px) rotate(5deg);}
    }
    .-is-space {
      color: #c0c0c0;
    }
</style>

