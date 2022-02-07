import Compiler from './compiler'
import Observer from './observer'

export default class Vue {
  constructor(options) {
    new Observer(options.data, this)
    new Compiler(options, this)
  }
}