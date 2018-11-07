<template>
  <div class="container">

    <h1 class="title">QUIZ-O-MATIC</h1>
    <div class="box">

      <ul>
        <li v-for="(q, i) in questions">
          {{i +1}}.) {{decoder(q.question)}} - {{decoder(q.correct_answer)}}
          <!-- {{questions}} -->
          <span v-if="q.correct" class="tag is-success">
            <font-awesome-icon icon="check" /></span>
          <span v-if="!q.correct" class="tag is-danger">
            <font-awesome-icon icon="times" /></span>
          <br />
          <br />
        </li>
      </ul>

    </div>

    <div class="box">

      <p class="subtitle"> You scored:
        {{score}}%</p>

      <p v-if="score==0">Were your eyes closed?</p>
      <p v-if="0 <score && score < 50">Better luck next time!</p>
      <p v-if="51 <score && score < 79">Hey, pretty good!</p>
      <p v-if="80 <score && score < 100">You know your stuff!</p>
      <p v-if="score == 100">Perfect!</p>

      <br />
      <a @click="goHome" class="button is-large is-link ">
        Create New Quiz
      </a>

    </div>

  </div>

</template>

<script>
export default {
  name: 'Results',
  data() {
    return {
      questions: []
    }
  },
  methods:
    {
      goHome() {
        this.$store.commit('setQuizSettings', null);
        this.$router.push('/')

      },
      decoder(str) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = str;
        return textArea.value;
      }
    },
  mounted() {

  },
  computed:
    {


      score() {
        let answers = this.$store.state.answers;
        let questions = this.$store.state.questions;


        if (questions.length == 0) {
          this.$router.push('/')

        }

        let numCorrect = 0;

        answers.forEach(function (a, i) {

          if (questions[i].correct_answer == a) {
            numCorrect++;
            questions[i].correct = true;
          }
          else {
            questions[i].correct = false;
          }






        });

        this.questions = questions;

        // console.log(numCorrect)
        return numCorrect / questions.length * 100;
      }
    }
}
</script>

<style>
</style>
