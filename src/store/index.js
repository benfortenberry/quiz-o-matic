import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    quizSettings: null
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions
    },
    setAnswers(state, answers) {
      state.answers = answers
    },
    setQuizSettings(state, settings) {
      state.quizSettings = settings
    }
    // deleteWord(state, word) {
    //   state.words = state.words.filter(obj => obj.headword !== word)
    // }
  }
})
