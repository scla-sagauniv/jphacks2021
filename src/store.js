import Vue from 'vue'
import Vuex from 'vuex'
import {_} from 'vue-underscore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    interval: 120,
    strings: [],
    mondaiString: '',
    displayString: '',
    inputStrings: null,
    inputStringsBase: null,
    selected: {category: null, page: null},
    missCount: 0,
    typeSuccessCount: 0,
    successStage: 0,
    isDied: false,
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
        state.inputStrings = state.inputStringsBase.concat()
        mondai = state.inputStrings.pop()
      }
      state.mondaiString = mondai.mondaiString
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
    die(state) {
      state.isDied = true
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
