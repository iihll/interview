function compare(a, b) {
  const aArr = a.split('.')
  const bArr = b.split('.')
  const len = Math.max(aArr.length, bArr.length)
  const map = {
    rc: 3,
    beta: 2,
    alpha: 1,
  }

  for(let i = 0; i < len; i++) {
    const aNum = Number(aArr[i])
    const bNum = Number(bArr[i])
    if(isNaN(aNum) && isNaN(bNum)) {
      if(map[aArr[i]] > map[bArr[i]]) {
        return 1
      }
      if(map[aArr[i]] < map[bArr[i]]) {
        return -1
      }
    } else {
      if(aNum > bNum) {
        return 1
      }
      if(aNum < bNum) {
        return -1
      }
    }
  }

  return 0
}

console.log(compare('1.3.0.alpha.2', '1.3.0.rc.2'))