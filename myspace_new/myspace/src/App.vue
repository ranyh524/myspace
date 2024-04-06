<script setup>
import Navbar from '@/components/Navbar.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

</script>

<template>
  <Navbar/>
  <router-view :key="$route.fullPath"/>
</template>


<style scoped>

</style>
