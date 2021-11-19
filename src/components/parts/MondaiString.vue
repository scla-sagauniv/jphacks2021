<template>
    <div class="news-box">
        <div id="title-box">
          <p>【{{$store.state.successStage + 1}}問目のニュースタイトル】</p>
          <fuwa-moji class="done" v-for="(char_map, i) in mondaiString[0]" :key="i" :char_map="char_map" :index="i"></fuwa-moji>
          <transition v-if="$store.state.isGameStart" appear name="fade">
            <span v-if="fade_f" style="opacity: 0">
              <fuwa-moji class="doing" v-for="(char_map, i) in mondaiString[1]" :key="i" :char_map="char_map" :index="i"></fuwa-moji>
            </span>
          </transition>
        </div>
        <!-- ここがリスタートボタンを押した際に適応されないのどうにかしてちょ、、 -->
        <div v-if="!$store.state.isGameStart">
            <img src="https://1.bp.blogspot.com/-D2I7Z7-HLGU/Xlyf7OYUi8I/AAAAAAABXq4/jZ0035aDGiE5dP3WiYhlSqhhMgGy8p7zACNcBGAsYHQ/s400/no_image_square.jpg" class="img-size">
        </div>
        <!-- 動画のリンクだと切れます -->
        <div v-else class="img-box">
          <img :src="returnImageUrl" class="img-size" style="display: block; margin: auto;">
        </div>
    </div>
</template>

<script>
import FuwaMoji from './FuwaMoji'
  export default {
    name: 'mondaiString',
    components: {
      FuwaMoji
    },
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
      onEnter() {
        return this.$store.state.onEnter
      },
      returnImageUrl() {
        return this.$store.state.mondaiImage;
      }
    },
    watch: {
      update() {
        if (this.$store.state.displayString.length == 0) {
          return this.stageClear();
        }
        this.createMondai();
      },
      onEnter() {
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
      createMondai() {
        this.mondaiString = [];
        let doneList = this.$store.state.mondaiString[0];
        doneList = doneList.split('');
        let doingList = this.$store.state.mondaiString[1];
        doingList = doingList.split('');
        
        for (let i = 0; i < doneList.length; i++) {
          doneList[i] = {word: doneList[i], ruby: undefined}
        }
        for (let i = 0; i < doingList.length; i++) {
          doingList[i] = {word: doingList[i], ruby: undefined}
        }
        this.mondaiString = [doneList, doingList]
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
      font-size: 25px;

    }
    .doing {
      font-size: 25px;
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
