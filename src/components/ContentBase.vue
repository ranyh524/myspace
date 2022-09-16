<template>
    <div class="home">
      <div class="container">
        <div class="card">
          <div class="card-body">
            <slot></slot>
          </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  
  //每个组件都会导出一个对象
  export default {
    name: "ContentBase",
    //在template里面会用到的组件
    components: {
      
    }
  }
  </script>
  
  <style scoped>
  .container{
    margin-top: 20px;
  }
  </style>