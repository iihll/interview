class EventEmitter {
  _events

  constructor() {
    this._events = Object.create(null)
  }

  emit(evt, ...args) {
    if (!this._events[evt]) return false

    const fns = [...this._events[evt]]
    fns.forEach((fn) => {
      fn.apply(this, args)
    })

    return true
  }

  on(evt, fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('The evet-triggered callback must be a function')
    }
    if(!this._events[evt]) {
      this._events[evt] = [fn]
    } else {
      this._events[evt].push(fn)
    }
  }

  off(evt, fn) {
    if(!this._events[evt]) return
    if(!fn) {
      this._events[evt] && (this._events[evt].length = 0)
    }

    let cb
    const cbLen = this._events[evt].length
    for(let i = 0; i < cbLen; i++) {
      cb = this._events[evt][i]
      if(cb === fn) {
        this._events[evt].splice(i, 1)
        break
      }
    }
  }

  removeAllListeners(evt) {
    if(evt) {
      this._events[evt] && (this._events[evt].length = 0)
    } else {
      this._events = Object.create(null)
    }
  }
}
