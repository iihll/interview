<template>
  <div>
    <keepAlive exclude="Test1Vue">
      <TestVue v-if="show" />
      <Test1Vue else />
    </keepAlive>
    <button @click="toggle">toggle</button>
  </div>
</template>

<script>
import keepAlive from './keep-alive'
import TestVue from './Test.vue'
import Test1Vue from './Test1.vue'

export default {
  components: { keepAlive, TestVue, Test1Vue },
  data() {
    return {
      show: true,
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
  },
}
</script>
