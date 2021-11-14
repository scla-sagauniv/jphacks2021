<template>
    <div :style="style">
        {{successStage-1}}/{{$store.state.selected.page}}
    </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    data() {
      return {
        width: 0,
      }
    },
    computed: {
      style() {
        return {
          width: this.width + '%'
        }
      },
      successStage() {
        return this.$store.state.successStage
      }
    },
    watch: {
      successStage() {
        this.width = 100 * ((this.successStage-1) / this.$store.state.selected.page)
      }
    },
  }
</script>

<style scoped lang="scss">
    div {
        margin: 20px 0;
        height: 25px;
        line-height: 25px;
        background: black;
        color: #aaaaaa;
        opacity: 0.7;
        overflow: hidden;

    }
</style>
