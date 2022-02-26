let timerFunc
let pending = false
const cbList = []

const p = Promise.resolve()
timerFunc = () => {
  p.then(() => {
    pending = false
    const arr = cbList.slice(0)
    cbList.length = 0
    for(let i = 0; i < arr.length; i++) {
      arr[i]()
    }
  })
}

export default function nextTick(cb) {
  let _resolve
  cbList.push(() => {
    cb()
  })
  if(!pending) {
    pending = true
    
  }
}