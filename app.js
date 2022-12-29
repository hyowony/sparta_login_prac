const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res)=> {
  res.send('첫 프로젝트!')
})

app.get('/user', (req,res)=> {
  res.send('회원정보 가져오기')
})

app.post('/login', (req,res)=> {
  res.send('로그인 페이지')
})

app.post('/logout', (req,res)=> {
  res.send('로그아웃 페이지')
})
app.post('/register',(req,res)=> {
  res.send('등록하기')
})

app.listen(port, ()=> {
  console.log('서버가 열렸어요!')
})

