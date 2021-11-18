<template>
    <div class="gameDisplay">
        <h1>
            <fuwa-moji v-for="(char_map, i) in title" :key="i" :char_map="char_map" :index="i"></fuwa-moji>
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
    </div>
</template>

<script>
  import FuwaMoji from './parts/FuwaMoji'
  import getNews from '@/getNews'
  export default {
    name: 'GameStartDisplay',
    components: {
        FuwaMoji,
    },
    data() {
        return {
          title: [],
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
        }
    },
    created() {
      this.gameinit()
      let title_str = 'N-Typing'.split('')
      for (let i = 0; i < title_str.length; i++) {
        this.title.push({word: title_str[i], ruby: undefined})
      }
      console.log(this.title)
    },
    methods: {
      gameinit() {
        getNews(this.pageNumber, this.categorySelect).then((res) => {
          this.$store.commit("initMondai", {mondai_list: res, category: this.categorySelect, page: this.pageNumber})
        })
      },
      gameStart() {
        this.$emit('game-start')
      },
    }
  }
</script>

<style scoped lang="scss">
    .gameDisplay {
        width: 1000px;
        height: 800px;
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
