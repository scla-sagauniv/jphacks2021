import Vue from 'vue'
import Vuex from 'vuex'
import {_} from 'vue-underscore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    interval: 90,
    strings: [],
    mondaiString: ['', ''],
    displayString: '',
    inputStrings: null,
    inputStringsBase: null,
    selected: {category: null, page: null},
    missCount: 0,
    typeSuccessCount: 0,
    successStage: 0,
    onEnter: 0,
    isGameClear: false,
    type_count: 0,
    type_size: 100
  },
  mutations: {
    initMondai(state, init_param) {
      state.inputStrings = _.shuffle(init_param.mondai_list)
      state.inputStringsBase = state.inputStrings.concat()
      state.selected.category = init_param.category
      state.selected.page = init_param.page
    },
    choice(state) {
      let mondai = state.inputStrings.pop()
      if (!mondai) {
        state.isGameClear = true
        return
      }
      state.mondaiString[0] = ''
      state.mondaiString[1] = mondai.mondaiString
      state.displayString = mondai.displayString
      state.strings = mondai.inputString.split('')
      //type_sizeを決める
      //題名のpx
      let k;
      let wobj = document.getElementById("ruler");
      wobj.style.fontSize = 50;
      wobj.innerHTML = state.displayString;
      k = wobj.offsetWidth + 1200;
      //stringsの数
      let s_c = state.strings.length
      state.type_size = k / s_c;
    },
    check(state, text) {
      let n = 0;
      text = text.split('');
      state.displayString = state.displayString.split('');
      while(state.displayString[0] === text.shift()) {
        state.displayString.shift();
        if(state.displayString.length == 0) {
          break;
        }
        n++;
        state.typeSuccessCount++;
      }
      state.displayString = state.displayString.join('');
      console.log(state.mondaiString)
      state.mondaiString[0] += state.mondaiString[1].substr(0, n);
      state.mondaiString[1] = state.mondaiString[1].substr(n);
      state.onEnter++;
    },
    CountUpEnter(state) {
      state.onEnter++;
    },
    typeMiss(state) {
      state.missCount++
    },
    typeSuccess(state) {
      state.typeSuccessCount++
      state.type_count++
    },
    stageSuccess(state) {
      state.successStage++
      state.type_count = 0
    },
    resetAll(state) {
      state.isDied = false
      state.interval = 120
      state.strings = []
      state.missCount = 0
      state.successStage = 0
      state.typeSuccessCount = 0
      state.displayString = ''
    },
    decrementInterval(state, decrement) {
      state.interval -= decrement
    }
  }
})
