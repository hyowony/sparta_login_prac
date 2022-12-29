const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res)=> {
  res.send('첫 프로젝트!')
})

app.listen(port, ()=> {
  console.log('서버가 열렸어요!')
})