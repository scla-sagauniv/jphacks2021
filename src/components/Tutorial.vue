<template>
    <div id="overlay">
        <div id="content">
            <fuwa-moji v-for="(char_map, i) in tuto_title" :key="i" :char_map="char_map" :index="i" id="fuwa_title"></fuwa-moji>
            <ul>
                <li>⚠️問題文は一定時間で隠れてしまいます⚠️</li>
                <li>⚠️エンターキーを押すと再度表示させることができます⚠️</li>
                <li>⚠️打ち間違いを減らして高得点を目指しましょう！⚠️</li><br>
                <li>🐤<b>スコア画面のTwitterボタンをクリックして結果をシェアできます</b>🐤</li>
            </ul>
            <span>半角スペースは</span>
            <fuwa-moji :char_map='{word: " ", ruby: undefined}' :index=1 id="fuwa_m"></fuwa-moji>
            <span>全角スペースは</span>
            <fuwa-moji :char_map='{word: "　", ruby: undefined}' :index=1 id="fuwa_m"></fuwa-moji>
            <span>と表示されるので注意しよう！</span>
            <br>
            <b-button v-on:click="close" id="close" variant="primary">Close</b-button>
        </div>
    </div>
</template>

<script>
    import FuwaMoji from './parts/FuwaMoji'
    export default {
        components:{
            FuwaMoji
        },
        data() {
            return {
                tuto_title: []
            }
        },
        created() {
            let msg = '遊び方'.split('')
            for (let i = 0; i < msg.length; i++) {
                this.tuto_title.push({word: msg[i], ruby: undefined})
            }
        },
        methods:{
            close(){
                this.$emit('close')
            }
        }
    }
</script>



<style scoped lang="scss">
p{
    margin: 0;
}

ul{
    list-style: none;
    text-align: center;
    margin-left: -40px;
    margin-top:10px;
}

li{
 margin-bottom:5px;
}

#fuwa_m{
    font-size: 30px;
    display: inline-block;
}

#fuwa_title{
    font-size: 40px;
    display: inline-block;
}

#close{
    // position: absolute;
    margin-top: 30px
}

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
</style>