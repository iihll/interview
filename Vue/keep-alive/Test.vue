<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      msg: 'test vue',
    }
  },
  beforeCreate() {
    console.log('test vue beforeCreate')
  },
  created() {
    console.log('test vue created')
  },
  beforeMount() {},
  mounted() {
    console.log('test vue created')
  },
  beforeUpdate() {
    console.log('test vue beforeUpdate')
  },
  updated() {
    console.log('test vue updated')
  },
  beforeDestroy() {
    console.log('test vue beforeDestroy')
  },
  destroyed() {
    console.log('teste vue destroyed')
  },
  activated() {
    console.log('test vue activated')
  },
  deactivated() {
    console.log('test vue deactivated')
  }
}
</script>
