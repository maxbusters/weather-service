<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import TheFooter from '@/components/Main/TheFooter.vue'
import TheHeader from '@/components/Main/TheHeader.vue'

const store = useStore()
onMounted(() => {
  store.dispatch('initState')
})
</script>

<template>
  <TheHeader />
  <main class="main__container">
    <router-view />
  </main>
  <TheFooter />
</template>

<style lang="scss">
body {
  background-color: aliceblue;
  margin: 0;
}

.app {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.container {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 600px) {
    width: 90%;
  }
}

.main__container {
  min-height: 75vh;
}
</style>
