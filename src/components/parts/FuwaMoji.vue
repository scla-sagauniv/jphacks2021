<template>
  <span v-if="char_map.ruby" v-bind:class="klass" :style="style"><ruby>{{char_map.word}}<rt>{{char_map.ruby}}</rt></ruby></span>
  <span v-else v-bind:class="klass" :style="style">{{char_map.word}}</span>
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
        this.char_map.word = "･";
        this.klass.push("-is-space")
      }
      else if (this.char_map.word === "　") {
        this.char_map.word = "〇";
        this.klass.push("-is-space")
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
      color: #C0C0C0;
    }
</style>

