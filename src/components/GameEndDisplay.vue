<template>
    <div class="gameDisplay">
        <h1>Game End</h1>
        <p v-for="index in $store.state.successStage" :key="index"> {{$store.state.inputStringsBase[index].displayString}} </p>
        <button @click="gameStart">Retry</button>
        <p><font size="5">Success Stages: {{successStage}}</font></p>
        <p><font size="5">Total Type: {{totalTypeCount}}</font></p>
        <p><font size="5">Success Type: {{successTypeCount}}</font></p>
        <p><font size="5">Accuracy: {{accuracy}}%</font></p>
        <p v-for="index in $store.state.successStage" :key="index"> {{$store.state.inputStringsBase[index].displayString}} </p>
        <br>
        <h4>カテゴリー</h4>
        <p>
        <b-form-select name="category" v-model="categorySelect" @change="categorySelect">
          <option>general</option>
          <option>business</option>
          <option>entertainment</option>
          <option>health</option>
          <option>science</option>
          <option>technology</option>
          <option>sports</option>
        </b-form-select>
        </p>
        <h4>問題数</h4>
        <p>
        <b-form-select name="PageNumber" v-model="pageNumber" @change="pageNumber">
          <option disabled value="">Please select one</option>
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </b-form-select>
        </p>
        <b-button variant="primary" @click="gameStart">Retry</b-button>
    </div>
</template>

<script>
  import getNews from '@/getNews'
  export default {
    name: 'GameEndDisplay',
    components: {},
    computed: {
      successStage() {
        return this.$store.state.successStage
      },
      totalTypeCount() {
        return this.successTypeCount + this.missTypeCount
      },
      successTypeCount() {
        return this.$store.state.typeSuccessCount
      },
      missTypeCount() {
        return this.$store.state.missCount
      },
      accuracy() {
        if (this.totalTypeCount === 0) {
            return 0
        }
        return Math.ceil((this.successTypeCount / this.totalTypeCount) * 100);
      }
    },
    methods: {
      gameStart() {
        getNews(this.pageNumber, this.categorySelect).then((res) => {
          this.$store.commit("initMondai", res)
          this.$emit('game-start')
        })
      },
      categorySelect() {
      },
      pageNumber() {

      },
    }
  }
</script>

<style scoped lang="scss">
    .gameDisplay {
        width: 1000px;
        height: 700px;
        border: 5px solid #CCC;
        margin: auto;
        position: relative;
    }
    h1 {
        margin-top: 70px;
        font-size: 60px;
    }
</style>
