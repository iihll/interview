function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype)
  let res = fn.call(obj, ...args)
  if(res && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

// class Person {
//   constructor() {
//     this.name = 'lv'
//   }
// }
function Person() {
  this.name = 'lv'
}
const person = myNew(Person)

Person.prototype.age = 19

console.log(person.age);