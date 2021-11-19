import Vue from 'vue'
import Vuex from 'vuex'
import {_} from 'vue-underscore'

let start_msg = "スペースキーでスタート！".split('')
for (let i = 0; i < start_msg.length; i++) {
  start_msg[i] = {word: start_msg[i], ruby: undefined}
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    interval: 90,
    strings: [],
    mondaiString: ['', ''],
    displayString: start_msg,
    inputStrings: null,
    inputStringsBase: null,
    selected: {country: null, category: null, page: null},
    successStage: 0,
    onEnter: 0,
    missEnter: 0,
    missCount: 0,
    typeSuccessCount: 0,
    startTime: null,
    endTime: null,
    isGameStart: false,
    isGameClear: false,
    type_count: 0,
    type_size: 100,
    mondaiImage: ''
  },
  mutations: {
    initMondai(state, init_param) {
      state.inputStrings = _.shuffle(init_param.mondai_list)
      state.inputStringsBase = state.inputStrings.concat()
      state.selected.country = init_param.country
      state.selected.category = init_param.category
      state.selected.page = init_param.page
    },
    addMondai(state, add_param) {
      state.inputStrings = state.inputStrings.concat(_.shuffle(add_param.mondai_list))
      state.inputStringsBase = state.selected.country.concat(state.inputStrings.concat())
      state.selected.category = add_param.category
    },
    setPageNum(state, page) {
      state.selected.page = page
    },
    choice(state) {
      let mondai = state.inputStrings.shift()
      console.log(state.successStage+1, state.selected.page)
      if (state.successStage+1 == state.selected.page) {
        state.isGameClear = true
        state.endTime = Date.now()
        return
      }
      state.mondaiString = ['', mondai.mondaiString]
      state.displayString = mondai.furigana
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
      // イメージをとってくる
      state.mondaiImage = mondai.mondaiImage;
    },
    check(state, text) {
      let n = 0;
      let remainder = "";
      const text_len = text.length;
      if (text_len == 0) {
        return
      }
      text = text.split('');
      while(text.length > 0) {
        if (state.displayString[0].word.length > 1) {
          let word_list = state.displayString[0].word.split('');
          while(word_list.length > 0) {
            if (word_list[0] === text[0]) {
              word_list.shift();
              text.shift();
              state.typeSuccessCount++;
              n++;
            }
            else {
              remainder = word_list.join('')
              if (remainder === state.displayString[0].word) {
                break;
              }
              else {
                let tmp = {word: remainder, ruby: undefined};
                state.displayString.shift();
                state.displayString.unshift(tmp);
                break;
              }
            }
          }
          if (remainder.length === 0) {
            state.displayString.shift();
          }
          else {
            break;
          }
        }
        else {
          if (state.displayString[0].word === text[0]) {
            state.displayString.shift();
            text.shift();
            state.typeSuccessCount++;
            n++;
            if(state.displayString.length == 0) {
              break;
            }
          }
          else {
            break;
          }
        }
      }
      // state.displayString = state.displayString.join('');
      let done = state.mondaiString[0] + state.mondaiString[1].substr(0, n);
      let doing = state.mondaiString[1] = state.mondaiString[1].substr(n);
      state.mondaiString = [done, doing]
      state.onEnter++;
      if (text_len > n) {
        state.missEnter++
      }
    },
    start(state) {
      state.startTime = Date.now();
      state.isGameStart = true;
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
      state.isGameClear = false
      state.successStage = 0
      state.typeSuccessCount = 0
      state.onEnter = 0
      state.missEnter = 0
      state.mondaiString = ['', '']
      state.displayString = start_msg
    },
    decrementInterval(state, decrement) {
      state.interval -= decrement
    },
  }
})
