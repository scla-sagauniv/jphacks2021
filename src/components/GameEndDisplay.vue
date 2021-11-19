<template>
    <div class="gameDisplay">
        <h1 class="end-title">Game End</h1>
        <b-container>
          <b-row align-v="center">
            <b-col cols="8">
              <b-form-select :select-size="6" class="title-list">
                <option v-for="index in parseInt(pageNumber)" 
                :key="index" class="title-item" 
                v-on:click="toNews($store.state.inputStringsBase[index-1].mondaiUrl)"> 
                  <span style="border-bottom: solid 1px blue;">
                    {{$store.state.inputStringsBase[index-1].mondaiString}}
                  </span>
                </option>
              </b-form-select>
            </b-col>
            <b-col cols="4" class="result">
              <ul>
                <li class="text-left"><div class="score-titles">Time:</div>  <div class="scores">{{totalTime}}[s]</div></li>
                <li class="text-left"><div class="score-titles">Total Submit:</div>  <div class="scores">{{totalSubmit}}</div></li>
                <li class="text-left"><div class="score-titles">Miss Submit:</div>  <div class="scores">{{missSubmit}}</div></li>
                <li class="text-left"><div class="score-titles">Total Type: </div><div class="scores">{{totalTypeCount}}</div></li>
                <li class="text-left"><div class="score-titles -result">Score: </div><div class="scores -result">{{resultScore}}</div></li>
              </ul>
            </b-col>
          </b-row>
        </b-container>
        <br>
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
        <b-button variant="primary" @click="shareTwitter">Twitter共有</b-button>
    </div>
</template>

<script>
  import getNews from '@/getNews'
  export default {
    name: 'GameEndDisplay',
    components: {},
    computed: {
      successStage() {
        return this.pageNumber
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
          ],
          totalSubmit: this.$store.state.onEnter,
          missSubmit: this.$store.state.missEnter,
          totalTime: Math.floor((this.$store.state.endTime - this.$store.state.startTime) / 100) / 10, // ミリ秒なので小数第一位までの秒に変換して
          resultScore: 0,
        }
    },
    mounted() {
      this.resultScore = this.totalTypeCount * 100 - (Math.floor(this.totalTime * 5) + this.totalSubmit * 5 + this.missSubmit * 10)
    },
    methods: {
      gameStart() {
        getNews(this.pageNumber, this.categorySelect).then((res) => {
          this.$store.commit("initMondai", {mondai_list: res, category: this.categorySelect, page: this.pageNumber})
          this.$store.commit("resetAll")
          this.$emit('game-start')
        })
      },
      shareTwitter() {
        let text = "=== N-Typing 結果 ===\n"
        text += "クリアタイム : " + this.totalTime + "[s]\n"
        text += "Enter入力回数 : " + this.totalSubmit + "\n"
        text += "間違えEnter回数 : " + this.missSubmit + "\n"
        text += "合計タイプ文字数 : " + this.totalTypeCount + "\n"
        text += "Score : " + this.resultScore + "\n"
        text += "サイトURL : " + "https://news-typing-scla.herokuapp.com/\n"
        text += this.create_score_text(this.resultScore) + "\n"
        text += "#N_Typing #SCLA"
        let twitter_share_url = "https://twitter.com/intent/tweet?" + "text=" + encodeURIComponent(text);
        window.open(twitter_share_url, '_blank')
      },
      toNews(url){
        window.open(url, '_blank')
      },
      create_score_text(score){
        //スコアによって変動するテキストを作成するぞ
        let text = ["まあまあすごい","けっこうすごい","すごい!!!","ちょっとヤバい","ヤバい","ヤバすぎ","アルティメットヤバい","パーフェクトヤバい"]
        let selected_text = ""
        for (let i = 0; i < text.length - 1; i++){
          if (score <= (i + 1) * 5000){
            selected_text = text[i]
            break
          }
        }
        if(selected_text == ""){
          selected_text = text[text.length - 2] 
        }
        if(this.missSubmit == 0){
          selected_text = text[text.length - 1]
        }
        return selected_text
      }
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
        margin-top: 70px;
        font-size: 60px;
    }
    .end-title {
      width: 1000px
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
    .-result {
        color: red
    }
</style>
