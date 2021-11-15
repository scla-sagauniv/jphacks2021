<template>
    <transition appear name="fade">
        <div v-if="fade_f" :style="style">
            <fuwa-moji v-for="(char, i) in string" :key="i" :char="char" :index="i"></fuwa-moji>
        </div>
    </transition>
</template>

<script>
  import FuwaMoji from './FuwaMoji'
  export default {
    name: 'DisplayString',
    components: {
      FuwaMoji
    },
    data() {
      return {
        right: 0,
        fade_f: true,
        isSpace: false
      }
    },
    computed: {
      style(){
        return {
          opacity: 0,
          right: this.right + 'px',
        }
      },
      string() {
        return this.$store.state.displayString.substr(0, 12).split('')
      },
      type_count() {
        return this.$store.state.type_count
      }
    },
    watch: {
      type_count() {
        this.right = this.$store.state.type_size * this.$store.state.type_count;
      },
      string() {
        this.fade_f = !this.fade_f;
        this.$nextTick(function() {
          this.fade_f = !this.fade_f;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    div {
        font-size: 50px;
        margin: 70px auto 0 auto;
        text-align: center;
        position: relative;
        display: table;
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
