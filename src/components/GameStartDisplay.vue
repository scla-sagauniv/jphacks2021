<template>
    <div class="gameDisplay">
        <h1>
            <fuwa-moji v-for="(char, i) in title" :key="i" :char="char" :index="i"></fuwa-moji>
        </h1>
        <button @click="gameStart">Start Game</button>
        <p>
        <select name="category" v-model="categorySelect" @change="categorySelect">
          <option disabled value="">Please select one</option>
          <option>general</option>
          <option>business</option>
          <option>entertainment</option>
          <option>health</option>
          <option>science</option>
          <option>technology</option>
          <option>sports</option>
        </select>
        </p>
        <p>
        <select name="PageNumber" v-model="pageNumber" @change="pageNumber">
          <option disabled value="">Please select one</option>
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
        </p>
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
          title: 'Vue-Typing'.split('')
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
        width: 600px;
        height: 400px;
        border: 1px solid #CCC;
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
</style>
