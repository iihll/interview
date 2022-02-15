const isFunction = (variable) => typeof variable === 'function'
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

/*
  Promise 对象三种状态
    pending 进行中
    fulfilled 已成功
    rejected 已失败

  状态只能由 pending 变为 fulfilled 或由 pending 变为 rejected ，且状态改变之后不会在发生变化，会一直保持这个状态
*/
class MyPromise {
  /* 
    handle 函数包含 resolve 和 reject 两个参数，它们是两个函数，可以用于改变 Promise 的状态和传入 Promise 的值
  */
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      handle(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    onResolved = isFunction(onResolved) ? onResolved : (value) => value
    onRejected = isFunction(onRejected)
      ? onRejected
      : (err) => {
          throw error
        }

    return new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
      }

      if (this.status === REJECTED) {
      }

      if (this.status === PENDING) {
      }
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      // 参数可以不是数组，但必须具有 Iterator 接口
      if (typeof promises[Symbol.iterator] !== 'function') {
        reject('Type error')
      }
      if (promises.length === 0) {
        resolve([])
      } else {
        const res = []
        let count = 0
        const len = promises.length
        for (let i = 0; i < len; i++) {
          Promise.resolve(promises[i])
            .then((data) => {
              res[i] = data
              if (++count === len) {
                resolve(res)
              }
            })
            .catch((err) => {
              reject(err)
            })
        }
      }
    })
  }
}