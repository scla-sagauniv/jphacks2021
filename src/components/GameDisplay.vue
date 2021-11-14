<template>
    <div class="gameDisplay" :style="style" :class="klass">
        <progress-bar></progress-bar>
        <mondai-string></mondai-string>
        <display-string></display-string>
        <!-- <strings></strings> -->
        <b-container fluid class="bv-example-row">
          <b-row>
            <b-col>
              <b-form-input
              md="10"
              offset-md="1"
              v-model="input"
              placeholder="入力してEnter"
              @keypress.prevent.enter.exact="enable_submit"
              @keyup.prevent.enter.exact="submit">
              </b-form-input>
            </b-col>
          </b-row>
        </b-container>
    </div>
</template>

<script>
  import Strings from './parts/Strings'
  import DisplayString from './parts/DisplayString'
  import MondaiString from './parts/MondaiString'
  import ProgressBar from './parts/ProgressBar'

  export default {
    name: 'GameDisplay',
    components: {
      Strings,
      DisplayString,
      MondaiString,
      ProgressBar
    },
    data() {
      return {
        style: {},
        klass: [],
        input: "",
      }
    },
    computed: {
      missCount() {
        return this.$store.state.missCount
      }
    },
    watch: {
      missCount() {
        this.klass = ['damaged']
        setTimeout(() => {
          this.klass = []
        }, 200)
      }
    },
    methods: {
      enable_submit() {
        this.can_submit_search = true
      },
      submit() {
        if (!this.can_submit_search) return
        this.$store.commit("check", this.input);
        this.$store.commit("CountUpEnter");
        this.input = '';
        return this.can_submit_search = false;
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

    .damaged {
        animation: damage;
        animation-duration: .2s;
    }
    @keyframes damage {
        0% {
            background : #CCC;
            opacity: 0.1;
        }
        100% {
            background : #FFF;
        }
    }

    .input{
      width: 700px;
      height:50px;
      margin: auto;
    }
</style>
