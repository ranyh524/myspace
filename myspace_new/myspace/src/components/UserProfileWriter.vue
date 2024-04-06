<script setup>
import { ref } from 'vue'
import {useRoute} from 'vue-router'
const text = ref('')

const emit = defineEmits(['pushpost'])
const push = ()=>{
    emit('pushpost',text.value),
    text.value=''
}



</script>

<template>
    <div class="mb-3" >
        <textarea v-model="text" class="form-control" id="FormControlTextarea" rows="3"></textarea>
        <button @click="push" type="button" class="btn btn-success">发帖</button>
    </div>
</template>

<style scoped>
.form-control{
    margin-top: 20px;
}
.btn-success{
    margin-top: 5px;
}
</style>