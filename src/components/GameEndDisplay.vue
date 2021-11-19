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
        <a v-bind:href="href_title" target="_blank" rel="noopener noreferrer" @click="shareTwitter" class="twitter-share-button" data-show-count="false">
        <img src="../assets/Twitter social icons - rounded square - blue.svg">
        </a>
    </div>
</template>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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
          href_title: "test",
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
        this.href_title = twitter_share_url;
        // window.open(twitter_share_url, '_blank')
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
    img {
      margin-top: 20px;
      width: 5%;
      height: 5%;
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
    // .twitter-share-button{
    //   position: relative;
    //   height: 20px;
    //   box-sizing: border-box;
    //   padding: 1px 12px 1px 12px;
    //   background-color: #1d9bf0;
    //   color: white;
    //   border-radius: 1000px;
    //   font-weight: 500;
    //   cursor: pointer;
    // }
    // .twitter-share-button i{
    //   position: relative;
    // top: 2px;
    // display: inline-block;
    // width: 14px;
    // height: 14px;
    // background: transparent 0 0 no-repeat;
    // background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
    // }
</style>
