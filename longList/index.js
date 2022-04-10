const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

let id = 1

app.get('/getList', (req, res) => {
  const list = []

  for(let i = 0; i < 100000; i++) {
    list.push({
      id: i,
      name: `吕超${id}`,
      age: 20,
      img: 'https://picsum.photos/200/300'
    })
  }

  res.send(list)
})

app.listen(3000)