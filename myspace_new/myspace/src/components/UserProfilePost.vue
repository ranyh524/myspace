<!-- 所有发的帖子 -->
<script setup>
const props = defineProps({
    posts:{
        type:Object,
        required:true
    }
})

</script>

<template>
    <div class="card po" v-for="post in props.posts">
        <div class="card-body" >
            {{ post.content }}
        </div>
    </div>

</template>

<style scoped>
.po{
    margin-top: 10px;
}
</style>