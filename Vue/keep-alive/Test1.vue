<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'test1 vue'
    }
  },
  beforeCreate() {
    console.log('test1 vue beforeCreate');
  },
  created() {
    console.log('test1 vue created');
  }
}
</script>