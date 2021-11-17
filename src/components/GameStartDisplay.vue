<template>
    <div class="gameDisplay">
        <h1>
            <fuwa-moji v-for="(char, i) in title" :key="i" :char="char" :index="i"></fuwa-moji>
        </h1>
        <br>
        <h3>カテゴリー</h3>
        <b-container>
          <b-row>
            <b-col col lg="4"></b-col>
            <b-col>
              <b-form-select class="text-center" cols="8" md="auto" v-model="categorySelect" :options="categorySelects"></b-form-select>
            </b-col>
            <b-col col lg="4"></b-col>
          </b-row>
        </b-container>
        <h3 class="mt-3">問題数</h3>
        <b-container>
          <b-row>
            <b-col col lg="4"></b-col>
            <b-col>
              <b-form-select class="text-center" v-model="pageNumber" :options="pageNumbers"></b-form-select>
            </b-col>
            <b-col col lg="4"></b-col>
          </b-row>
        </b-container>
        <br>
        <b-button variant="primary" @click="gameStart">Start Game</b-button>
        <b-button variant="primary" @click="open_tutorial">tutorial</b-button>
        <tutorial v-show="tutorial_page" v-on:close="close_tutorial"></tutorial>
    </div>
</template>

<script>
  import FuwaMoji from './parts/FuwaMoji'
  import getNews from '@/getNews'
  import Tutorial from './Tutorial'
  export default {
    name: 'GameStartDisplay',
    components: {
        FuwaMoji,
        'tutorial':Tutorial,
    },
    data() {
        return {
          title: 'News-Typing'.split(''),
          categorySelect: 'general',
          categorySelects: [
            { value: 'general', text: '一般' },
            { value: 'business', text: 'ビジネス' },
            { value: 'entertainment', text: 'エンタメ' },
            { value: 'health', text: '健康' },
            { value: 'science', text: '科学' },
            { value: 'technology', text: 'テクノロジー' },
            { value: 'sports', text: 'スポーツ' },
          ],
          pageNumber: '5',
          pageNumbers: [
            { value: '5', text: '5' },
            { value: '10', text: '10' },
            { value: '25', text: '25' },
            { value: '50', text: '50' },
            { value: '100', text: '100' }
          ],
          tutorial_page: false,
        }
    },
    methods: {
      gameStart() {
        getNews(this.pageNumber, this.categorySelect).then((res) => {
          this.$store.commit("initMondai", {mondai_list: res, category: this.categorySelect, page: this.pageNumber})
          this.$emit('game-start')
        })
      },
      open_tutorial() {
        this.tutorial_page = true;
      },
      close_tutorial(){
        this.tutorial_page = false;
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
