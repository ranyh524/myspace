<template>
  <ContentBase>
    首页
  </ContentBase>
</template>

<script>
  import ContentBase from '../components/ContentBase';


//每个组件都会导出一个对象
export default {
  name: 'HomeView',
  //在template里面会用到的组件
  components: {
    ContentBase,
}
}
</script>

<style scoped>

</style>