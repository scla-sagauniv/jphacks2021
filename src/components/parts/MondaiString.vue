<template>
    <div class="mondai-box">
        <p>【{{$store.state.successStage}}問目のニュースタイトル】</p>
        <span class="done">{{mondaiString[0]}}</span>
        <transition appear name="fade">
          <p v-if="fade_f" class="doing">
            <span v-for="(char, i) in mondaiString[1]" :key="i" v-bind:class="{'-is-space': char.isSpace}">{{char.char}}</span>
          </p>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'mondaiString',
    data() {
      return {
        fade_f: true,
        mondaiString: []
      }
    },
    mounted() {
      this.createMondai();
    },
    computed: {
      on_enter() {
        if (this.$store.state.displayString.length == 0) {
          return this.stageClear();
        }
        return this.$store.state.onEnter;
      },
    },
    watch: {
      on_enter() {
        this.createMondai();
        this.fade_f = !this.fade_f;
        this.$nextTick(function() {
          this.fade_f = !this.fade_f;
        })
      },
    },
    methods: {
      stageClear() {
        // choice next word
        this.$store.commit('choice');
        this.$store.commit('stageSuccess');
      },
      createMondai() {
        this.mondaiString = [];
        let charList = this.$store.state.mondaiString[1];
        charList = charList.split('');
        for (let i=0; i < charList.length; i++) {
          if (charList[i] === ' ') {
            charList[i] = {char: '･', isSpace: true};
          }
          else if (charList[i] === '　') {
            charList[i] = {char: '〇', isSpace: true};
          }
          else {
            charList[i] = {char: charList[i], isSpace: false};
          }
        }
        this.mondaiString.push(this.$store.state.mondaiString[0]);
        this.mondaiString.push(charList);
        console.log(this.mondaiString)
      }
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
    .-is-space {
      color: #C0C0C0;
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
