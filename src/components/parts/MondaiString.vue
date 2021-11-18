<template>
    <div class="news-box">
        <div id="title-box">
          <p>【{{$store.state.successStage + 1}}問目のニュースタイトル】</p>
          <span class="done">{{mondaiString[0]}}</span>
          <transition appear name="fade">
            <span v-if="fade_f" class="doing">
              <span v-for="(char, i) in mondaiString[1]" :key="i" v-bind:class="{'-is-space': char.isSpace}">{{char.char}}</span>
            </span>
          </transition>
        </div>
        <!-- 動画のリンクだと切れます -->
        <div class="img-box">
          <img :src="returnImageUrl" class="img-size" style="display: block; margin: auto;">
        </div>
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
      update() {
        return this.$store.state.displayString
      },
    },
    watch: {
      update() {
        if (this.$store.state.displayString.length == 0) {
          return this.stageClear();
        }
        this.createMondai();
        this.fade_f = !this.fade_f;
        this.$nextTick(function() {
          this.fade_f = !this.fade_f;
        })
      },
      returnImageUrl() {
        return this.$store.state.mondaiImage;
      }
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
      }
    }
  }
</script>

<style scoped lang="scss">
    .news-box {
        font-size: 25px;
        border: 2px solid #d3d3d3;
        margin: 10px;
        padding: 10px;
        position: relative;
        text-align: center;
        display: table;
        width: 970px;
    }
    #title-box {
      text-align: left;
    }
    .img-box {
        border: 2px solid #d3d3d3;
    }
    .img-size {
          width:55%;
          height: 300px;
          object-fit: contain;
          /*何これ*/
          user-select: none;
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
