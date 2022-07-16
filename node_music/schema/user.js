const mongoose =require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt'); // 비밀번호 암호화하기위함
const saltRounds = 10 // 암호화할 비밀번호 자리수

const jwt=require('jsonwebtoken');

var userSchema = mongoose.Schema({
    id :{
        type: String
    }, 

    password :{
        type: String,
    }, 
    tokenExp:{
        type: Number
    },

    token:{
        type:String
    }
});


userSchema.pre('save',function(next){

    var user = this;
    if(user.isModified('password')){

    bcrypt.genSalt(saltRounds,function(err,salt){
      if(err) return next(err)
    

      bcrypt.hash(user.password,salt,function(err,hash){
        if(err) return next(err)
        user.password = hash
        next()
      })
    }) 
    } else{
        next()
    }

  });

  userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainpassword와 데이터베이스에 있는 암호화된 password를 비교해야함
    // 그러기 위해서는 plainpassword도 암호화한 다음에 데이터베이스에 있는 password와 비교해야함
    // 왜냐하면 데이터베이스에 있는 암호화된 비밀번호를 복구화 할 수 없기 때문
    // 이것을 구하기 위해서는 bcrypr.compare 메서드를 사용한다

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
     
        // 비밀번호가 다르다면
        // callbackfunction에 err를 넣어 return
        if (err) return cb(err);

        // 비밀번호가 같다면
        // isMatch는 true값임, err는 없으므로 unll값을 넣는다
        cb(null, isMatch);
    }) 
}

  userSchema.methods.generateToken = function(cb){
    //json 웹토큰 생성
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'userToken')
    console.log(token)
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
  }

  userSchema.statics.findByToken = function(token, cd){
    var user = this;
  
    //  토큰을 decode 한다.
    //  콜백함수의 매개변수인 decoded는 token을 decode한 user의 id값이 나온다
    //  token을 구성할 때 user._id + userToken으로 하였으므로
    // 즉, jwt.sign(user._id.toHexString(), 'userToken')에서 userToken을 이용해 user._id의 값을 알아낼 수 있다
    jwt.verify(token, 'userToken', function(err, decoded){
      // 유저 아이디를 이용해서 유저를 찾은 다음에 
      // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
      user.findOne({"_id" : decoded, "token" : token}, function(err, user){
        if(err){
          return cd(err);
        }
        cd(null, user);
      })
    } )
  
  }


const User = mongoose.model('user',userSchema)
module.exports={User}