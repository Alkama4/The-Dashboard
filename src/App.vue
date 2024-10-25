<template>
  <div id="app"> <!-- Added a div wrapper for proper layout -->
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <CustomButton text="Click me!" />
      <CustomButton text="Or this?" />
      <CustomButton text="Who knows..." />
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import CustomButton from './components/CustomButton.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    CustomButton // Added CustomButton to components object
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
