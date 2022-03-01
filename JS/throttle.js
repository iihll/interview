function throttle(fn, delay = 1000) {
  let flag = true
  return () => {
    if(!flag) return

    flag = false
    setTimeout(() => {
      fn()
      flag = true
    }, delay)
  }
}