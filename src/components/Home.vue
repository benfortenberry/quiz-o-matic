<template>
  <div class="container">
    <h1 class="title">QUIZ-O-MATIC</h1>
    <div class="box">

      <div class="level-left">
        <div class="level-item">
          <label># Questions:</label>
        </div>
        <div class="level-item">
          <input type="number" class="input" v-model="numQuestions" placeholder="Enter Number of Questions">
        </div>
      </div>
      <br />
      <div class="level-left">
        <div class="level-item">
          <label>Category:</label>
        </div>
        <div class="level-item">
          <select name="trivia_category" v-model="category" class="select input">
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
        </div>
      </div>
      <br />
      <div class="level-left">
        <div class="level-item">
          <label>Difficulty:</label>
        </div>
        <div class="level-item">
          <div class="control">
            <label class="radio">
              <input type="radio" v-model="difficulty" value="any" name="anyD">
              Any
            </label>
            <label class="radio">
              <input type="radio" v-model="difficulty" value="easy" name="easy">
              Easy
            </label>
            <label class="radio">
              <input type="radio" v-model="difficulty" value="medium" name="medium">
              Medium
            </label>
            <label class="radio">
              <input type="radio" v-model="difficulty" value="hard" name="hard">
              Hard
            </label>
          </div>
        </div>
      </div>
      <br />
      <div class="level-left">
        <div class="level-item">
          <label>Types:</label>
        </div>
        <div class="level-item">
          <div class="control">
            <label class="radio">
              <input type="radio" v-model="qTypes" value="any" name="any">
              Any
            </label>
            <label class="radio">
              <input type="radio" v-model="qTypes" value="multiple" name="multiple">
              Multiple Choice
            </label>
            <label class="radio">
              <input type="radio" v-model="qTypes" value="boolean" name="boolean">
              True / False
            </label>
          </div>
        </div>
      </div>
      <br>
      <div class="level-left">
        <div class="level-item">
          <button :disabled="loading" class="button is-link is-large" @click="createQuiz">Start Quiz!</button>

        </div>
      </div>

      <div class="level-left" v-if="error">
        <div class="level-item">
          <div class="notification is-warning">

            Not enough questions found for this combination. Please try again.
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      // msg: 'Welcome to Your Vue.js App',
      numQuestions: 10,
      difficulty: 'any',
      qTypes: 'any',
      loading: false,
      error: false,
      category: 'any'
    }

  },
  methods: {


    createQuiz() {
      this.error = false;
      // console.log(this.quizUrl)
      this.loading = true;
      axios.get(this.quizUrl, {
        // headers: {
        //   'x-api-key': 'de102100-4217-4bf3-8bce-66aaf9c7b3ec'
        // }
      })
        .then(response => {
          // console.log(response.data);
          this.loading = false;
          if (response.data.results.length == this.numQuestions) {
            this.$store.commit('setQuestions', response.data.results);

            let settings = {
              difficulty: this.difficulty,
              qTypes: this.qTypes,
              category: this.category,
              numQuestions: this.numQuestions,

            }
            this.$store.commit('setQuizSettings', settings);


            this.$router.push('Quiz')
          }
          else {
            this.error = true;
          }

          // this.cat = response.data[0].url;
        })
        .catch(function (error) {
          // console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  },
  mounted() {
    let settings = this.$store.state.quizSettings;
    if (settings) {
      // console.log(settings)
      this.difficulty = settings.difficulty;
      this.qTypes = settings.qTypes;
      this.category = settings.category;
      this.numQuestions = settings.numQuestions;
    }

  },

  computed:
    {
      quizUrl() {
        let baseUrl = 'https://opentdb.com/api.php?amount=' + this.numQuestions

        if (this.category != 'any') {
          baseUrl = baseUrl + "&category=" + this.category
        }
        if (this.qTypes != 'any') {
          baseUrl = baseUrl + "&type=" + this.qTypes
        }
        if (this.difficulty != 'any') {
          baseUrl = baseUrl + "&difficulty=" + this.difficulty
        }

        return baseUrl;


      }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
