require('dotenv').config();

const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); //분석해서 가져오기
app.use(bodyParser.json());//json타입을 분석해서 가져오기

const {User} = require("./schema/user");
const{auth}=require("./middleware/auth");

const cookieParser=require('cookie-parser') // 쿠키에 저장할라고
app.use(cookieParser());

app.listen(8080, function () {
  console.log('listening on 8080')
}); 


app.use(express.static(path.join(__dirname, '../musicplayer/build')));

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '../musicplayer/build/index.html'));
 });



//--------DB------------------------

// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');
// 2. login DB 세팅
mongoose.connect(process.env.MONGO_URI+'login');
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});


app.post('/new' ,(req,res)=>{
  let id = req.body.id;
  let password = req.body.password;
  console.log(id)
  console.log(password)

//schema/user로 옮김
  // 6. Schema 생성. (혹시 스키마에 대한 개념이 없다면, 입력될 데이터의 타입이 정의된 DB 설계도 라고 생각하면 됩니다.)
  // var user = mongoose.Schema({
  // id : 'string',
  // password : 'string',
  // });

  // 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
  // var User = mongoose.model('id', user);



  // 8. Student 객체를 new 로 생성해서 값을 입력
  var newUser = new User(req.body);

    
  // 9. 데이터 저장( 회원가입)
  newUser.save(function(error, data){
  if(error){
      console.log(error);
  }else{
      console.log('Saved!')
    }
    });
  })

  //ㅡㅡㅡㅡ로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  
  app.post('/loginTry',(req,res)=>{

    //데이터베이스에서 찾기
    User.findOne({id : req.body.id},(err,user)=>{
      //console.log(req.body.password)
      if (!user){
        return res.json({
          loginSuccess:false,
          message:"일치하는 id 가 존재 하지않습니다"
        })
      }


      user.comparePassword(req.body.password, (err, isMatch) => {
        // console.log(req.body.password)
        if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
 

        //비밀번호까지 맞으면 토큰생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

        //토큰 저장(쿠키 로컬스토리지 세션등 다양하게 가능)-쿠키로 진행함
          res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })

        })
      })
    })
  })



  app.get('/schema/users/auth', auth, (req, res)=>{
    // 여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
    res.status(200).json({
        // req.user.id가 가능한 이유는 auth에서 req에 user를 넣었기 때문
        _id : req.user._id,
        // role 0 => 일반 유저
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,

    })
})

  //  auth를 넣어주는 이유는 logout을 하려면 login 상태이기 때문이다

app.get('/schema/users/logout', auth, (req, res) => {

  // 첫번째 인자는 찾으려는 table(알아듣기 쉽게 테이블이라고 했다), 두번째 인자는 업데이트하려는 것 
  User.findOneAndUpdate({_id : req.user._id}, {token : ""}, (err, user) => {
    console.log('req.user',req.user)  
    if(!user) return res.json({
          success : false,
          err
      });
      return res.status(200).send({
          success : true
      })
      

  })
})







