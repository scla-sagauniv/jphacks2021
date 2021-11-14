<template>
    <div class="gameDisplay">
        <h1>Game End</h1>
        <b-container>
          <b-row align-v="center">
            <b-col cols="8">
              <b-form-select :select-size="6" class="title-list">
                <option v-for="index in parseInt(pageNumber)" 
                :key="index" class="title-item" 
                v-on:click="toNews($store.state.inputStringsBase[index].mondaiUrl)"> 
                  <span style="border-bottom: solid 1px blue;">
                    {{$store.state.inputStringsBase[index-1].mondaiString}}
                  </span>
                </option>
              </b-form-select>
            </b-col>
            <b-col cols="4" class="result">
              <ul>
                <li class="text-left"><div class="score-titles">Stages:</div>  <div class="scores">{{successStage}}</div></li>
                <li class="text-left"><div class="score-titles">Total Type: </div><div class="scores">{{totalTypeCount}}</div></li>
                <li class="text-left"><div class="score-titles">Success Type: </div><div class="scores">{{successTypeCount}}</div></li>
                <li class="text-left"><div class="score-titles">Accuracy:</div> <div class="scores">{{accuracy}}%</div></li>
              </ul>
            </b-col>
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
        <b-button variant="primary" @click="gameStart">Retry</b-button>
        <br>
        <a :href="twitter_url">test</a>
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
      twitter_url(){
        return this.$store.state.twitter_share
      },
      accuracy() {
        if (this.totalTypeCount === 0) {
            return 0
        }
        return Math.ceil((this.successTypeCount / this.totalTypeCount) * 100);
      }
    },
    data() {
        return {
          categorySelect: this.$store.state.selected.category,
          categorySelects: [
            { value: 'general', text: '一般' },
            { value: 'business', text: 'ビジネス' },
            { value: 'entertainment', text: 'エンタメ' },
            { value: 'health', text: '健康' },
            { value: 'science', text: '科学' },
            { value: 'technology', text: 'テクノロジー' },
            { value: 'sports', text: 'スポーツ' },
          ],
          pageNumber: this.$store.state.selected.page,
          pageNumbers: [
            { value: '5', text: '5' },
            { value: '10', text: '10' },
            { value: '25', text: '25' },
            { value: '50', text: '50' },
            { value: '100', text: '100' }
          ]
        }
    },
    methods: {
      gameStart() {
        getNews(this.pageNumber, this.categorySelect).then((res) => {
          this.$store.commit("initMondai", {mondai_list: res, category: this.categorySelect, page: this.pageNumber})
          this.$store.commit("resetAll")
          this.$emit('game-start')
        })
      },
      categorySelect() {
      },
      pageNumber() {

      },
      toNews(url){
        window.open(url, '_blank')
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
    .title-list {
      // IE, Edge 対応
      -ms-overflow-style: none;
      // Firefox 対応
      scrollbar-width: none;
    }
    .title-list::-webkit-scrollbar {
        display:none;
    }
    .title-item {
        margin: 5px 0;
        color: blue;
    }
    ul {
        list-style-type: none;
    }
    li {
      position: relative;
      font-size: 27px;
      margin: 5px 0px;
    }
    .score-titles {
        position: absolute;
        left: 0;
        top: 0;
    }
    .scores {
        text-align: right;
    }

</style>
