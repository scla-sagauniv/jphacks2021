<template>
    <span v-bind:class="klass" :style="style">{{char}}</span>
</template>

<script>
  export default {
    name: 'Strings',
    props: ['char', 'index', 'isSpace'],
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
      if (isSpace) {
        this.klass.push('-is-space')
      }
    }
  }
</script>

<style scoped lang="scss">
    span {
        display:table-cell;
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
      color: #f5f5f5;
    }
</style>

