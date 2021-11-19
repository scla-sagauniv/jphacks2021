<template>
    <div class="gameDisplay">
          <b-button variant="primary" @click="open_tutorial" id="tutorial">Tutorial</b-button>
        <h1 class="game-title">
            <fuwa-moji v-for="(char_map, i) in title" :key="i" :char_map="char_map" :index="i"></fuwa-moji>
        </h1>
        <h3 class="mt-3">国</h3>
        <b-container>
          <b-row>
            <b-col col lg="4"></b-col>
            <b-col>
              <b-form-select class="text-center" v-model="country" :options="countrySelects"></b-form-select>
            </b-col>
            <b-col col lg="4"></b-col>
          </b-row>
        </b-container>
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
          title: [],
          country: 'jp',
          countrySelects: [
            { value: 'jp', text: '日本' },
            { value: 'us', text: 'アメリカ' },
          ],
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
    created() {
      let title_str = 'N-Typing'.split('')
      for (let i = 0; i < title_str.length; i++) {
        this.title.push({word: title_str[i], ruby: undefined})
      }

      if(this.first_tutorial()){
        this.tutorial_page = true;
      }
    },
    methods: {
      gameStart() {
        getNews(this.country, this.pageNumber, this.categorySelect).then((res) => {
          this.$store.commit("initMondai", {mondai_list: res, country: this.country, category: this.categorySelect, page: this.pageNumber})
          this.$emit('game-start')
        })
      },
      open_tutorial() {
        this.tutorial_page = true;
      },
      close_tutorial(){
        this.tutorial_page = false;
      },
      first_tutorial(){
        const name = "visit";
        const key_l = true;
        if(!localStorage.getItem(name)){
          localStorage.setItem(name, key_l);
          return true;
        }
        return false;
      },
    }
  }
</script>

<style scoped lang="scss">
    #tutorial{
      white-space:nowrap;
      position:absolute;
      top: 20px;
      left: 900px;
    }
    .gameDisplay {
        width: 1000px;
        height: 800px;
        border: 5px solid #CCC;
        margin: 0;
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
    .game-title {
      width: 1000px
    }
    .select {
        display: flex;
    }
</style>
