import Quiz from '@/components/Quiz.vue'
import Home from '@/components/Home.vue'
import Results from '@/components/Results.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'

const mutations = {
  setQuizSettings(state, data) {
    state.data = data
  }
}

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Quiz',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/Results',
      name: 'Results',
      component: Results
    }
  ],
});



describe('Results.vue', () => {

  let store

  beforeEach(() => {

    store = new Vuex.Store({

      state: {

        questions: [{
            category: "Entertainment: Video Games",
            correct_answer: "Portal 2",
            difficulty: "medium",
            incorrect_answers: ["Left 4 Dead 2", "Team Fortress 2", "Counter-Strike: Global Offensive"],
            question: "Which video game earned music composer Mike Morasky the most awards for his work?",
            type: "multiple"
          },
          {
            category: "History",
            correct_answer: "Germany",
            difficulty: "medium",
            incorrect_answers: ["Britain", "Belgium", "France"],
            question: "The Herero genocide was perpetrated in Africa by which of the following colonial nations?",
            type: "multiple"
          }
        ],
        answers: [null, null]
      },
      mutations
    })
  })

  it('displays default message', () => {
    const wrapper = shallowMount(Results, {
      store,
      localVue,
      router
    })
    const p = wrapper.find('h1')
    expect(p.text()).toBe('QUIZ-O-MATIC')

    wrapper.find('.is-link').trigger('click')

  })
})
