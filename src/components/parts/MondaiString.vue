<template>
    <div class="mondai-box">
        <p>【お題のニュースタイトル】</p>
        <span class="done">{{string[0]}}</span>
        <transition appear name="fade">
          <span class="doing" v-if="fade_f">{{string[1]}}</span>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'mondaiString',
    data() {
      return {
        fade_f: true,
        string: this.$store.state.mondaiString,
      }
    },
    computed: {
      on_enter() {
        if (this.$store.state.displayString.length == 0) {
          return this.stageClear();
        }
        return this.$store.state.onEnter;
      }
    },
    watch: {
      on_enter() {
        this.string = this.$store.state.mondaiString;
        this.fade_f = !this.fade_f;
        this.$nextTick(function() {
          this.fade_f = !this.fade_f;
        })
      }
    },
    methods: {
      stageClear() {
        // choice next word
        this.$store.commit('choice');
        this.$store.commit('stageSuccess');
      },
    }
  }
</script>

<style scoped lang="scss">
    div {
        font-size: 25px;
        border: 2px solid #d3d3d3;
        margin: 10px;
        padding: 10px;
        position: relative;
        text-align: left;
        display: table;
        user-select: none;
    }

    .mondai-box {
      width: 80%;
      height: 30%;
    }

    .done {
      color: red;
    }
    .doing {
      opacity: 0;
    }

    .fade-enter-active {
      animation: fade 3s;
    }
    .fade-leave-active {
      opacity: 0;
    }
    @keyframes fade { /*animation-nameで設定した値を書く*/
        0% {opacity: 1} /*アニメーション開始時は不透明度0%*/
        40% {opacity: 1}
        100% {opacity: 0} /*アニメーション終了時は不透明度100%*/
    }
</style>
