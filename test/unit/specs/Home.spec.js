import Vuex from 'vuex'
import axios from 'axios';
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Home from '@/components/Home'
import Results from '@/components/Results'
import Quiz from '@/components/quiz'
import VueRouter from 'vue-router'
import flushPromises from 'flush-promises'
jest.mock('axios', () => ({
  get: jest.fn(),
}));

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

describe('Home.vue', () => {

  beforeEach(() => {
    axios.get.mockClear();
    axios.get.mockReturnValue(Promise.resolve({}));
  });



  it('start a quiz', () => {
    const wrapper = shallowMount(Home, {
      mocks: {
        $store: {
          state: {
            questions: [],
            quizSettings: null
          }
        }
      },
      router,
      localVue
    })

    wrapper.find('button').trigger('click')

  });

  it('resore Settings', async () => {
    const response = {
      data: {
        results: [{

          category: "Entertainment: Video Games",
          correct_answer: "October 29, 1988",
          difficulty: "medium",
          incorrect_answers: ["August 14, 1989", "November 30, 1990", "September 1, 1986"],

          question: "When was the Sega Genesis released in Japan?",
          type: "multiple"
        }]
      },
    };
    axios.get.mockReturnValue(Promise.resolve(response));

    const wrapper = shallowMount(Home, {
      mocks: {
        $store: {
          state: {
            questions: [],
            quizSettings: {
              difficulty: 'easy',
              qtype: 'boolean',
              category: 10,
              numQuestions: 11
            }
          }
        }
      },
      router,
      localVue
    })



    wrapper.vm.$nextTick(() => {
      var ssSelect = wrapper.find('.select');
      // console.log(ssSelect.element.value);
      expect(ssSelect.element.value).toBe("10");

      var numQues = wrapper.find('#numQues');
      expect(numQues.element.value).toBe("11");

      wrapper.find('.is-link').trigger('click')
      // await flushPromises()

    })


  });
})
