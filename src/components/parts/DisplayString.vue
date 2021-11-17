<template>
    <div :style="style">
        <fuwa-moji v-for="(char, i) in string" :key="i" :char="char" :index="i"></fuwa-moji>
    </div>
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
      }
    },
    computed: {
      style(){
        return {
          right: this.right + 'px'
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
      }
    }
  }
</script>

<style scoped lang="scss">
    div {
        font-size: 50px;
        margin: 30px auto 0 auto;
        text-align: center;
        position: relative;
        display: table;
    }

</style>
