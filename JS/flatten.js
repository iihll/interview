function isObj(val) {
  return typeof val === 'object' && val !== null
}

function flatten(obj) {
  if (!isObj(obj)) {
    return
  }

  let res = {}

  const dfs = (cur, prefix) => {
    if (isObj(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}${index}`)
        })
      } else {
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`)
        }
      }
    } else {
      res[prefix] = cur
    }
  }

  dfs(obj, '')

  return res
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
}

console.log(flatten(obj))
