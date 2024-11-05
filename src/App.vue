<template>
  <div id="app">
    <NavigationBar @toggle-dark-mode="toggleDarkMode"/>
    <main>
      <LoremIpsum seed="1134234"/>
      <LoremIpsum seed="4234151"/>
      <LoremIpsum seed="5234232"/>
      <LoremIpsum seed="3234232"/>
    </main>
    <footer>
      <p>&copy; 2024 Aleksi Malkki. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import LoremIpsum from './components/LoremIpsum.vue';
import { toggleDarkMode, initializeDarkMode } from './utils/darkMode';

export default {
  name: 'App',
  components: {
    NavigationBar,
    LoremIpsum,
  },
  mounted() {
    initializeDarkMode();
  },
  methods: {
    toggleDarkMode() {
      console.info("Dark mode toggled!");
      toggleDarkMode(); // What is going on in here???
    }
  }
}
</script>

<style>
  /* Use the global.css file */
</style>