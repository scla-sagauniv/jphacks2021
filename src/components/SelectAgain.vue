<template>
    <div id="overlay">
        <div id="content">
            <div class="msg">
                ※ニュースの数が足りませんでした <br>
                （現在{{$store.state.inputStrings.length}}件）
            </div>
            <div>
                <b-form-checkbox-group
                v-model="check_value"
                :options="check_box_options"
                :state="state"
                name="checkbox-validation"
                size="lg"
                class="check-box"
                >
                </b-form-checkbox-group>
            </div>
            <div v-if="state">
                <h3>カテゴリー</h3>
                <b-container>
                    <b-row>
                        <b-col col lg="4"></b-col>
                        <b-col>
                        <b-form-select class="text-center" cols="8" md="auto" v-model="categorySelect" :options="categoryOptions"></b-form-select>
                        </b-col>
                        <b-col col lg="4"></b-col>
                    </b-row>
                </b-container>
            </div>
            <b-button class="start-btn" variant="primary" @click="gameStart">Start Game</b-button>
        </div>
    </div>
</template>

<script>
    import FuwaMoji from './parts/FuwaMoji'
    import getNews from '@/getNews'

    export default {
        props: ['country', 'pageNumber', 'category'],
        components:{
            FuwaMoji
        },
        data() {
            return {
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
                check_box_options: [
                    {text: "そのままスタート", value: "0"},
                    {text: "別のニュースを追加", value: "1"}
                ],
                check_value: ["1"],
                change_num: 1
            }
        },
        computed: {
            state() {
                this.change_num++
                this.check_value = String(this.change_num % 2)
                return this.check_value === "1"
            },
            categoryOptions() {
                let idx = 0
                for (let i = 0; i < this.categorySelects.length; i++) {
                    if (this.categorySelects[i].value === this.category) {
                        break;
                    }
                    idx++;
                }
                this.categorySelects.splice(idx, 1)
                return this.categorySelects
            }
        },
        methods:{
            close(){
                this.$emit('close')
            },
            gameStart() {
                if (this.state) {
                    getNews(this.country, this.pageNumber, this.categorySelect).then((res) => {
                        this.$store.commit("addMondai", {mondai_list: res, category: this.categorySelect})
                        this.$emit('close_select')
                    })
                }
                else {
                    this.$store.commit("setPageNum",this.$store.state.inputStrings.length)
                    this.$emit('close_select')
                }
            },
        }
    }
</script>



<style scoped lang="scss">
#content{
  z-index:10;
  width:630px;
  height: 450px;
  padding: 1em;
  background:#fff;
}

#overlay{
  z-index:4;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.msg {
    text-align: center;
    color: red;
    font-size: 30px;
    margin-top: 20px
}

.check-box {
    text-align: center;
    margin: 50px 0 50px 0;
}

.start-btn {
    margin-top: 50px
}
</style>