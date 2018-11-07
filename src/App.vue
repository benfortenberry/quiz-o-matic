<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

body {
  padding-top: 35px;
  padding-bottom: 35px;
}
.level,
.level-left {
  padding-top: 5px;
}
* {
  font-family: "Montserrat", Courier, monospace !important;
}
html {
  background-image: url("./assets/just-waves.png");
  background-position-y: -2rem;
}
</style>
