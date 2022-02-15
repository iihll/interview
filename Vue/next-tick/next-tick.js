const callbacks = []
let pending = false
let timerFunc

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

const p = Promise.resolve()
timerFunc = () => {
  p.then(flushCallbacks)
}

export default function nextTick(cb, ctx) {
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        throw new Error(e)
      }
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}
