class LinkListNode {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

class LinkList {
  constructor() {
    // 头节点
    this.head = null
    // 尾节点
    this.tail = null
  }

  prepend(value) {
    const node = new LinkListNode(value, this.head)
    this.head = node
    if(!this.tail) {
      this.tail = node
    }

    return this
  }

  append(value) {
    const node = new LinkListNode(value)
    if(!this.head) {
      this.head = node
      this.tail = node
      return this
    }

    this.tail.next = node
    this.tail = node

    return this
  }

  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex
    // 如果下标 === 0，插入头节点之前
    if(index === 0) {
      this.prepend(value)
    } else {
      // 顺序查找插入位置的节点
      let currentNode = this.head
      const node = new LinkListNode(value)
      for(let i = 0; currentNode; i++) {
        if(i === index) break
        currentNode = currentNode.next
      }

      // 如果存在该节点则在该节点之后插入
      if(currentNode) {
        node.next = currentNode.next
        currentNode.next = node
      } else {
        // 否则在尾节点插入
        if(this.tail) {
          this.tail.next = node
          this.tail = node
        } else {
          this.head = node
          this.tail = node
        }
      }
    }
    return this
  }

  delete(value) {
    if(!this.head) {
      return null
    }

    let deleteNode = null
  }

  reverse() {
    let currentNode = this.head
    let prevNode = null
    let nextNode = null

    while(currentNode) {
      nextNode = currentNode.next
      currentNode.next = prevNode

      prevNode = currentNode
      currentNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode

    return this
  }
}

const linkList = new LinkList()
linkList.append(1)
linkList.append(2)
linkList.append(3)
linkList.reverse()
console.log(linkList)