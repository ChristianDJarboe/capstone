const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
const request=require("request");

var tokens = []
// for bcrypt
const saltRounds = 10
function insertuserCredentials(user_id,email,password){
  console.log("insert credentials")
  let insertCredentials = "INSERT INTO usersCredentials (user_ID, email, password) VALUES (?, ?, ?)"
  //insert into usersCredentials table
  bcrypt.hash(password, saltRounds, function(err, hash) {
    insertCredentials = mysql.format(insertCredentials, [user_id, email, hash ])
  
    pool.query(insertCredentials, (err, res) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('email is taken')
        return handleSQLError(res, err)
      }
      console.log("credentials created")
      console.log(insertCredentials);
    })
  })
}

function insertBrandMetrics(user_id,res){
console.log("inserting brand metrics");
let sql = "INSERT INTO brandMetrics (brand_id) values ("+user_id+")";
pool.query(sql,(err,rows)=>{
  if( err) return handleSQLError(res,err)
  console.log("metrics created");
  // console.log(rows);
  // return res.json(rows);
})
}


const signup = (req, res) => {
  console.log(req.body);


  const { email, password, user_type } = req.body
  let insertUser = "INSERT INTO users (account_name, user_type) VALUES( ?, ?)"

  //insert into users table
  insertUser =mysql.format(insertUser,[email,user_type])
  pool.query(insertUser, (err, result) => {
    if (err) {
      console.log(err.code);
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('handle is taken')
      return handleSQLError(res, err)
    }
    //SUCCESS

      console.log("new insert ID"+ result.insertId);
      insertuserCredentials(result.insertId,email,password);

    if(user_type =="influencer"){
      //TODO
      console.log(user_type);
    }else if(user_type == "brand"){
      //PROBABLY TODO ASWELL
      console.log(user_type);

    }else{
      console.log("this should never happen fix it b");
    }
    return res.send("user created");
  })
}

const login = (req, res) => {
  const { email, password } = req.body
  let sql = "SELECT users.*, usersCredentials.* FROM users LEFT JOIN usersCredentials on usersCredentials.user_ID = users.id WHERE email = ?"
  sql = mysql.format(sql, [ email ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    if (!rows.length) return res.status(404).send('No matching email')

    const hash = rows[0].password
    bcrypt.compare(password, hash)
      .then(result => {
        if (!result){
          console.log("wrong password")
          return res.status(400).send('Invalid password')
    
        } 
        console.log("accepted")

        const data = { ...rows[0] }
        const user_id = data.user_ID
        data.password = 'REDACTED'
        console.log()
        const token = jwt.sign(data, 'secret')


        res.json({
          msg: 'Login successful',
          token,
          user_id
        })
        
      })
  })
}
const fbCred =(req,res)=>{

  var user_id = getCookie(req.headers['cookie'],"user_id")
  console.log(user_id);
  let sql = "SELECT * FROM fbCredentials WHERE user_ID = ?"
  sql = mysql.format(sql, [ user_id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    if (!rows.length) return res.status(404).send('FB not linked')
    return res.send(rows);
  })
}
function getCookie(cookies,name) 
    {
      var match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
        return(match[2])
      }
      else{
           console.log('--something went wrong---');
      }
   }
   
const insertFBCredentials=(req,res)=>{
  let fbid = process.env.fb_app_id
  let fbsecret = process.env.fb_app_secret
  let fbtoken = req.body.fb_token
  request.get("https://graph.facebook.com/v9.0/oauth/access_token?  "+
  "grant_type=fb_exchange_token&"+
  "client_id="+fbid+"&"+
  "client_secret="+fbsecret+"&"+
  "fb_exchange_token="+fbtoken+"",function(error,response,body){
           if(error){
                 console.log(error);
           }else{
                  console.log("new token response:")
                  console.log(response.body);
                  let x = JSON.parse(response.body)
                  const { user_ID, fb_ID,fb_signedReq} = req.body;  //From client
                  const {expires_in,access_token} = x;        //from converting short token to long
  let sql = "INSERT INTO fbCredentials (user_ID, fb_ID, expiresIn,fb_token,fb_signedReq) VALUES( ?, ?,?,?,?)"
  console.log("insertFbCredenctions token: "+access_token);

  //insert into users table
  sql =mysql.format(sql,[ user_ID, fb_ID, expires_in,access_token,fb_signedReq])
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err.code);
      return handleSQLError(res, err)
    }else{
      getFBPages(access_token,fb_ID,user_ID)
      return res.send(result);

    }
   
  })
         }
  });
}

function getFBPages(token,acc_id,user_id){
  console.log("token getFBPAges: "+token)
  request.get("https://graph.facebook.com/v9.0/"+acc_id+"/accounts?access_token="+token+"",function(error,response,body){
           if(error){
                 console.log(error);
           }else{
            console.log(response.body);
            let x = JSON.parse(response.body);
            let acc_id = x.data[0].id
            getInstagramAccount(acc_id,token,user_id)
           }
  })
}
function getInstagramAccount(page_id,token,user_id){
  request.get( "https://graph.facebook.com/v9.0/"+page_id+"?fields=instagram_business_account&access_token="+token+""
  ,function(error,response,body){
    if(error){
          console.log(error);
    }else{
     console.log(response.body);
     let x = JSON.parse(response.body);
     let ig_id = x.instagram_business_account.id
     console.log(ig_id+" :ig_id");
     let sql = "INSERT INTO instagramCredentials (user_ID, account_id) VALUES(?,?)"
     sql = mysql.format(sql,[user_id,ig_id])
      pool.query(sql, (err, result) => {
      if (err) {
        console.log(err.code);
        console.log("FAILED IG CREDENTIALS INSERT")
      }else{
        console.log("ig credentials inserted")
      }
  })
    }
})
}
module.exports = {
  fbCred,
  insertFBCredentials,
  signup,
  login
}