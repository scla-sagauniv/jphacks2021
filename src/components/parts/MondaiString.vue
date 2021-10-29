<template>
    <div :style="style">
        【お題のニュースタイトル】</br>
        {{$store.state.mondaiString}}
    </div>
</template>

<script>
  export default {
    name: 'DisplayString',
    data() {
      return {
        style: {
        },
      }
    },
    computed: {
      string() {
        return this.$store.state.displayString.split('')
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

</style>
