export default class Dep {
  static target

  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    
  }

  notify() {}
}

Dep.target = null