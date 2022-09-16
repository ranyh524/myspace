<template>
    <ContentBase>
      404
    </ContentBase>
  </template>
  
  <script>
    import ContentBase from '../components/ContentBase';
  
  //每个组件都会导出一个对象
  export default {
    name: 'NotFoundView',
    //在template里面会用到的组件
    components: {
      ContentBase,
  }
  }
  </script>
  
  <style scoped>
  
  </style>