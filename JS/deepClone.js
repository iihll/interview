function deepClone(obj = {}, map = new Map()) {
  // 不是引用类型直接返回
  if (typeof obj !== 'object') {
    return obj
  }
  // 缓存处理
  if (map.get(obj)) {
    return map.get(obj)
  }

  let result = {}
  // 判断是否为数组
  if (obj instanceof Array || Object.prototype.toString(obj) === '[object Array]') {
    result = []
  }
  map.set(obj, result)
  // 递归赋值
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map)
    }
  }

  return result
}

const a = { test: 1, c: 'eee', d: [{ label: 'a'}], e: () => {}, f: function() {} }

const b = deepClone(a)
b.test = 2
b.e = 'test'
console.log('a', a)
console.log('b', b)
