// 判断值是否定义
function isDef(v) {
  return v !== undefined && v !== null
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

// 返回所有子元素中第一个子组件
function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

// 删除数组元素
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// 获取组件名
function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

// 判断值是否存在 [String, Array]
function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  }

  return false
}


function pruneCache(keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const entry = cache[key]
    console.log('entry', entry)
    if (entry) {
      const name = entry.name
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  const entry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes = [String, RegExp, Array]

export default {
  name: 'keep-alive',
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },
  data() {
    return {
      // cache: Object.create(null),
      // keys: [],
    }
  },
  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this

      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance,
        }
        keys.push(keyToCache)
        // 判断 prop max 超出则删除缓存列表中的第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    },
  },
  beforeCreate() {
    console.log('keep-alive vue beforeCreate')
  },
  created() {
    console.log('keep-alive vue created')
    this.cache = Object.create(null)
    console.log('cache', this.cache)
    this.keys = []
  },
  beforeMount() {
    console.log('keep-alive vue beforeMount')
  },
  mounted() {
    // render 后缓存子节点
    this.cacheVNode()
    this.$watch('include', (val) => {
      pruneCache(this, (name) => matches(val, name))
    })
    this.$watch('exclude', (val) => {
      pruneCache(this, (name) => !matches(val, name))
    })
    console.log('keep-alive vue mounted')
    console.log('keep-alive this', this)
    console.log('keep-alive $vnode', this.$vnode)
    console.log('keep-alive _vnode', this._vnode)
    console.log('this.cache', this.cache)
    console.log('this.keys', this.keys)
  },
  beforeUpdate() {
    console.log('keep-alive vue beforeUpdate')
  },
  updated() {
    console.log('keep-alive vue updated')
  },
  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  render() {
    console.log('keep-alive vue render')
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    console.log('componentOptions', componentOptions)
    if (componentOptions) {
      const name = getComponentName(componentOptions)
      const { include, exclude, cache, keys } = this

      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const key =
        vnode.key == null
          ? componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key
      if (cache[key]) {
        // 如果缓存中存在该子节点则用缓存的实例替换生成的实例
        vnode.componentInstance = cache[key].componentInstance
        // keys 数组去重
        remove(keys, key)
        keys.push(key)
      } else {
        // 否则将子节点赋值给 vnodeToCache, render 执行完毕后再 mounted 钩子内进行子节点缓存
        this.vnodeToCache = vnode
        this.keyToCache = key
      }

      // 在子节点 data 上添加 keepAlive 属性用于跳过
      vnode.data.keepAlive = true
    }

    return vnode || (slot && slot[0])
  },
}
