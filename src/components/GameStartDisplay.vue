<template>
    <div class="gameDisplay">
        <h1>
            <fuwa-moji v-for="(char, i) in title" :key="i" :char="char" :index="i"></fuwa-moji>
        </h1>
        <br>
        <h4>カテゴリー</h4>
        <b-container>
          <b-row>
            <b-col col lg="4">1 of 3</b-col>
            <b-col>
              <b-form-select class="text-center" cols="8" md="auto" name="category" v-model="categorySelect" @change="categorySelect">
                <option>general</option>
                <option>business</option>
                <option>entertainment</option>
                <option>health</option>
                <option>science</option>
                <option>technology</option>
                <option>sports</option>
              </b-form-select>
            </b-col>
            <b-col col lg="4">3 of 3</b-col>
          </b-row>
        </b-container>
        <h4 class="mt-3">問題数</h4>
        <b-container class="d-flex justify-content-end">
          <b-form-select class="select text-center mt-2" name="PageNumber" v-model="pageNumber" @change="pageNumber">
            <option disabled value="">Please select one</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </b-form-select>
        </b-container>
        <b-button variant="primary" @click="gameStart">Start Game</b-button>
    </div>
</template>

<script>
  import FuwaMoji from './parts/FuwaMoji'
  import getNews from '@/getNews'
  export default {
    name: 'GameStartDisplay',
    components: {
        FuwaMoji
    },
    data() {
        return {
          title: 'News-Typing'.split('')
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
        margin-top: 160px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        position: relative;
        display: table;
    }
    .select {
        display: flex;
    }
</style>
