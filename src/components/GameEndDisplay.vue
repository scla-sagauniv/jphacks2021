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
        <b-button variant="primary" @click="gameStart" size="lg" class="retry">Retry</b-button>
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
          country: this.$store.state.selected.country,
          countrySelects: [
            { value: 'jp', text: '日本' },
            { value: 'us', text: 'アメリカ' },
          ],
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
        getNews(this.country, this.pageNumber, this.categorySelect).then((res) => {
          this.$store.commit("resetAll")
          this.$store.commit("initMondai", {mondai_list: res, category: this.categorySelect, page: this.pageNumber})
          this.$emit('show_title')
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
    .retry {
      margin-top: 100px
    }
</style>
