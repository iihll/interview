<template>
  <div>
    <div class="test" :style="'height: ' + height + 'px'" ref="test"></div>
    <button @click="handleClick">edit</button>
  </div>
</template>

<script>
import nextTick from './next-tick'

export default {
  data() {
    return {
      show: false,
      height: 20,
    }
  },
  methods: {
    handleClick() {
      this.height = 30
      console.log(this.$refs.test.offsetHeight)
      nextTick(() => {
        console.log(this.$refs.test.offsetHeight)
      })
    },
  },
}
</script>

<style>
.test {
  background-color: pink;
}
</style>
