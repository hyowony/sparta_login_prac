const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
const port = 3000

//*json 형태의 body를 받기 위해서 작성 express를 쓸거고 .을 통해 json()형식의 자료형을 가져온다라고 이해하면 된다.

app.use(express.json())

// users 라는 데이터를 직접 할당한다. key-value로 된 json 형식이다.
const users = [

{name: "우준호", id: "noggong", password: "1234"},
{name: "이설인", id: "seolin", password: "asdf"},
{name: "주민석", id: "minseok", password: "hello"},
{name: "유희선", id: "heesun", password: "94kf"},
{name: "한동주", id: "dongjoo", password: "vded"},
  
]

app.get('/login', (req,res)=> {
  const id = req.query.id
  const password = req.query.password
  //유저를 찾아라 단 유저의 id값이 서로 일치하는 것만 찾아야한다. find > 정보를 찾아서 담는 기능이다. 찾았을 때 효원이 없으면 null로 표현된다. 
  const user = users.find(user => user.id ===id)
  console.log(user)

  
  //만약 유저가 아니라면 누구인가? 라는 메세지를 출력하라

  // ! 유저가 없으면 res.send한다 누구인가라는 메세지를 보낸다. 
  if(!user) {
    return res.send("누구인가?")
  }

  // 만약 유저에서 패스워드가 일치하지 않는다면 비밀번호 확인^^ 메세지 출력

  if (user.password !== password) {
    return res.send("비밀번호 확인hae^^")
  }
  //로그인이 되었을 때 쿠키를 생성하라. 
  res.cookie('user-id', user.id)
  //user.name > 유저안에 있는 이름을 찾아라 , > user-id안에 데이터베이스에 있던 id가 있는 것이다.
  //
  res.send("쿠키가 생성되었습니다.")
})

app.get('/logout', (req,res)=> {
  //clearcookie 기능 쓰는 이유
  // 로그아웃 기능에서 쿠키를 지우는 것은 쿠키를 통해 로그인을 확인하기 때문이다. 
  // 그러므로 쿠키를 지우면 쿠키에 저장된 로그인 기능이 인증이 안 되기 때문에 로그아웃이 되는 것이다. 
  res.clearCookie("user-id")
  res.send("로그아웃")
})

app.get('/register', (req,res)=> {
  const id = req.query.id
  const password = req.query.password
  const name = req.query.name

  //find 함수를 통해서 user라는 함수를 실행시키고 만약에 id가 id와 일치한다면 
  //등록해라

  //user DB안에서 ID를 찾는다. 회원가입하는 사람이 입력한 아이디와 DB 아이디가 같은지 찾는것이다. 찾았는데 user가 있다면  
  const user = user.find(user => user.id === id)
  /// 만약에 아니라면 "중복아이디야를 출력하라"
  if (user) {
    return res.send("중복아이디야")
  }
//user에다 id,password,name으로 된 값을 넣어라- 회원가입을 시켜주는 것이다. 
  users.push({id,password,name})
  console.log(users)
  res.send("회원가입")
})
//로그인이 되었을 때 무엇인가를 하기 위해서 - 너 로그인 해서 정상적으로 쿠키를 가지고 있느냐를 물어보는 것이다.

app.get('/users', (req,res)=> {
  const id = req.cookies["user-id"]
  //만약 유저 아이디가 아니라면 로그인부터 해^^ 라는 메세지를 출력하라. 
  if(!id) {
    return res.send("로그인부터 해~")
  }
  //네가 DB에 등록되어 있는 회원이 맞니? 

  const user = users.find(user => user.id === id)
  if(!user) {
    return res.send("회원 정보 잘 못 넣었습니다")
  }
  //유저의 정보가 맞다면 정보를 보내줘라.
  res.send(user)
})

app.listen(3000, ()=> {
  console.log('서버가 열렸어요!')
})

