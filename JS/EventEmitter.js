class EventEmitter {
  constructor() {
    this.enevts = {}
  }

  // 订阅
  on(type, cb) {
    if(this.enevts[type]) {
      this.enevts[type].push(cb)
    } else {
      this.enevts[type] = [cb]
    }
  }

  // 取消订阅
  off(type, cb) {
    if(!this.enevts[type]) return

    this.enevts[type] = this.enevts[type].filter(item => item !== cb)
  }

  // 触发事件
  emit(type, ...rest) {
    this.enevts[type] && this.enevts[type].forEach(fn => fn.apply(this, rest))
  }

  // 只执行一次订阅事件
  once(type, cb) {
    function fn() {
      cb()
      this.off(type, fn)
    }
    this.on(type, fn)
  }
}
