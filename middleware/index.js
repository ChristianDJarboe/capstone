
const jwt = require('jsonwebtoken')



const logger = (req, res, next) => {
  console.log(`${req.path} ${new Date().toISOString()}`)
  next()
}

const authenticate = (req, res, next) => {
  //console.log(req.headers);
  var token;
  //for some reason i kept getting an issue where the cookies werent being sent in the header
  //so in the event that happens, we can authenticate by sending the token in the header directly
  try{
   token = getCookie(req.headers['cookie'],"token")

  } catch(err){
    token = req.headers.token
  }
  for(let i=0;i<token.length;i++){
    if(token.charAt(i)=='='){
      token = token.substring(i+1);
      //console.log(token);

    }
  }

  try {
    const decoded = jwt.verify(token, 'secret')
    //console.log(decoded);
    req.user = decoded
    next()
  } catch(err) {
    res.sendStatus(401)
  }
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

module.exports = {
  logger,
  authenticate
}
