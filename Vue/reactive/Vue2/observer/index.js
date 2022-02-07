import Dep from './dep'

export default class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    this.walk(value)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep()
  if(arguments.length === 2) {
    val = obj[key]
  }

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = val

      return value
    },
    set: function reactiveSetter(newVal) {
      const value = val
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      val = newVal
      dep.notify()
    }
  })
}
