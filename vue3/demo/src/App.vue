<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { ref, effect, computed, onMounted } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)
effect(() => {
  console.log(counter.value)
  // console.log(twiceTheCounter.value)
})
onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <div>
    <div>{{counter}}</div>
    <button @click="counter += 1">add</button>
    <button @click="counter -= 1">subtract</button>
  </div>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
</template>

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
