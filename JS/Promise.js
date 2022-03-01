const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError(`TypeError: Chaining cycle detected for promise #<Promise> `))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (v) => {
            if (called) return
            called = true
            resolvePromise(promise, v, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach((cb) => cb(this.value))
    }

    const reject = (reason) => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach((cb) => cb(this.reason))
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (e) => {
            throw e
          }
    const p = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(p, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(p, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(p, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(p, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return p
  }

  catch(errCallback) {
    return this.then(null, errCallback)
  }

  finally(finallyCallback) {
    return this.then(
      (data) => {
        Promise.resolve(finallyCallback()).then(() => data)
      },
      (err) => {
        return Promise.resolve(finallyCallback()).then(() => {
          throw err
        })
      }
    )
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }

  static all = function (promises) {
    let result = []
    let times = 0
    return new Promise((resolve, reject) => {
      function processResult(data, index) {
        result[index] = data
        times += 1
        // 计数器等于数组长度表示所有 promise 都已 resolve, 则可以 resolve
        if (times == promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i]
        Promise.resolve(promise).then((data) => {
          processResult(data, i)
          // 只要有一个 reject 就 reject
        }, reject)
      }
    })
  }

  static race = function (promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i]
        Promise.resolve(promise).then(resolve, reject)
      }
    })
  }

  static allSettled = function (promises) {
    let result = []
    let times = 0
    return new Promise((resolve, reject) => {
      function processResult(data, index, status) {
        result[index] = { status, value: data }
        if (++times == promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i]
        Promise.resolve(promise).then(
          (data) => {
            processResult(data, i, 'fulfilled')
          },
          (err) => {
            processResult(err, i, 'rejected')
          }
        )
      }
    })
  }
}

Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
