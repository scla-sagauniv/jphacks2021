<template>
    <div>
        <p>【お題のニュースタイトル】</p>
        <p><span class="done">{{string[0]}}</span>{{string[1]}}</p>
        <!-- 動画のリンクだと切れます -->
        <img :src="returnImageUrl" class="img-size">
    </div>
</template>

<script>
  export default {
    name: 'mondaiString',
    data() {
      return {
        fade_f: true,
      }
    },
    computed: {
      string() {
        if (this.$store.state.displayString.length == 0) {
          this.stageClear();
        }
        this.fade_f = !this.fade_f;
        return this.$store.state.mondaiString;
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
    }
    .img-size {
        width: 700px;
        height: 300px;
    }
    .done {
      color: red;
    }

    .fade-enter-active {
      animation: fade 5s;
    }
    .fade-leave-active {
      animation: fade 5s reverse;
    }
    @keyframes fade { /*animation-nameで設定した値を書く*/
        0% {opacity: 0} /*アニメーション開始時は不透明度0%*/
        40% {opacity: 1}
        60% {opacity: 1;}
        100% {opacity: 0} /*アニメーション終了時は不透明度100%*/
    }

</style>
