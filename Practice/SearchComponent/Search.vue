<template>
  <div>
    <form @submit.prevent="handleSearch">
      <input v-model="searchValue" type="search" name="Search" id="" />
      <button type="submit">Search</button>
    </form>
    <div class="list-view" ref="scrollBox" @scroll="handleScroll">
      <div v-if="loading" class="loading">
        <span>Loading...</span>
      </div>
      <div class="list-view-phantom" :style="{ height: contentHeight }"></div>
      <ul ref="content" class="list-view-content">
        <li
          class="list-view-item"
          :style="{ height: itemHeight + 'px' }"
          v-for="(item, i) in resultList.list"
          :key="i"
        >
          <p>title: {{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const resultList = {
  // 状态码，0为成功，非0为失败。可能有5%概率返回失败
  status: 0,
  // 总数
  total: 60,
  // 列表
  list: new Array(100).fill({
    // 标题
    title: '加总价比还',
    // 内容
    content:
      '然矿存条而带除增克众文较。风便物离放布所布导受感建成构题。命调式或则收算几比每思育产业。新结位阶现论通众构规真亲天龙证。青还龙容认商具山主角由带段。运她般系准任面研那保列定候听三深名火。例节山极市身分有次品你观者验。',
  }),
}

export default {
  data() {
    return {
      resultList,
      visibleData: [],
      itemHeight: 30,
      searchValue: '',
      loading: false,
    }
  },
  computed: {
    contentHeight() {
      return this.resultList.list.length * this.itemHeight + 'px'
    },
  },
  mounted() {
    this.updateVisibleData()
  },
  methods: {
    updateVisibleData(scrollTop = 0) {
      // 要显示的数目
      const visibleCount = Math.ceil(
        this.$refs.scrollBox.clientHeight / this.itemHeight
      )
      // 开始索引，容器的scrollTop / 一项的高度
      const start = Math.floor(scrollTop / this.itemHeight)
      // 结束索引，开始索引 + 要显示的数目
      const end = start + visibleCount
      // 滚动时，动态改变数组数据
      this.visibleData = this.resultList.list.slice(start, end)
      // 设置列表的transfromY，开始索引 * 一项的高度
      this.$refs.content.style.webkitTransform = `translate3d(0, ${
        start * this.itemHeight
      }px, 0)`
    },
    handleScroll() {
      const scrollTop = this.$refs.scrollBox.scrollTop
      this.updateVisibleData(scrollTop)
    },
    handleSearch() {
      this.loading = true
      setTimeout(() => {
        console.log('searchValue', this.searchValue)
        this.loading = false
      }, 2000)
    },
  },
}
</script>

<style>
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #aaa;
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading span {
  font-size: 24px;
  color: white;
}

.list-view-phantom {
  /* 使用不可见区域，撑起这个列表，让列表的滚动条出现 */
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 30px;
  box-sizing: border-box;
}
</style>
