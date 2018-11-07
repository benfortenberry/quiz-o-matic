<template>
    <div class="container">
        <h1 class="title">QUIZ-O-MATIC</h1>

        <ul>
            <li class="box" v-for="(q, index) in questions">

                <h3 class="subtitle is-5">{{index + 1}}.)
                    {{decoder(q.question)}}

                </h3>

                <div class="control" style="padding-left:100px;">
                    <label class="radio" v-for="(a, a_i) in q.incorrect_answers">
                        <input type="radio" v-model="q.answer" :value="a" :name="index + a">
                        {{decoder(a)}}
                    </label>

                </div>

                <!-- <div class="control" v-if="q.type =='boolean'">
                    <label class="radio" v-for="(a, a_i) in q.incorrect_answers">
                        <input type="radio" v-model="q.answer" :value="a" :name="index + a">
                        {{a}}
                    </label>

                </div> -->
                <br />

                <span class="tag is-light">{{q.category}}</span>
                <span v-if="q.difficulty == 'easy'" class="tag is-success">Easy</span>
                <span v-if="q.difficulty == 'medium'" class="tag is-warning">Medium</span>
                <span v-if="q.difficulty == 'hard'" class="tag is-danger">Hard</span>
                <!-- {{q.incorrect_answers}} -->

            </li>
        </ul>
        <!-- {{questions}} -->
        <br />
        <div class="level">
            <div class="level-item">

                <div class="field is-grouped">
                    <p class="control">
                        <a @click="goHome" class="button is-large is-info ">
                            Change Quiz
                        </a>
                    </p>
                    <p class="control">
                        <a @click="submitAnswers" class="button is-large is-link">
                            Submit Quiz
                        </a>
                    </p>

                </div>

            </div>
        </div>

    </div>

</template>

<script>
export default {
    name: 'Quiz',
    data() {
        return {
            questions: []
        }
    },
    mounted() {
        let questions = this.$store.state.questions;

        if (questions.length == 0) {
            this.$router.push('/')

        }
        questions.forEach(q => {
            // if(q.type == 'multiple')
            // {
            q.incorrect_answers.push(q.correct_answer);

            let shuffled = q.incorrect_answers
                .map((a) => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value);

            q.incorrect_answers = shuffled;


            // }
        });

        this.questions = questions;

    },
    methods: {
        submitAnswers() {
            let answers = [];
            this.questions.forEach(q => {

                answers.push(q.answer);


            });

            this.$store.commit('setAnswers', answers);
            // console.log(answers);
            this.$router.push('Results')

        },
        goHome() {
            this.$router.push('/')

        },
        decoder(str) {
            var textArea = document.createElement('textarea');
            textArea.innerHTML = str;
            return textArea.value;
        }
    },
    computed: {
        // questions(){
        //      //









        //                 return this.questions;

        // }
    }

}
</script>

<style>
.center {
  text-align: center;
  margin-left: 0;
  margin-right: 0;
}
</style>
