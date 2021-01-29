const mysql = require('mysql')
const { param } = require('../routers/api')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
const request=require("request");
const e = require('express');

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

const getUser = (req,res) =>{
  console.log("Get /user")
  var user_id = getCookie(req.headers['cookie'],"user_id")
  console.log(user_id)
  let sql = "SELECT * FROM users WHERE id = ?"
  let replacements = [user_id];
  sql = mysql.format(sql,replacements);
  
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);
  })
}
const getCampaign = (req,res)=>{
  console.log("getting campaign "+req.headers.user_id)
  let user_id = req.headers.user_id;
  let campaign_id = req.headers.campaign_id;
  let replacements=[user_id,campaign_id]
  let sql = "SELECT * FROM campaigns WHERE admin_id = ? AND id = ?"
  sql = mysql.format(sql,replacements);

  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    //console.log(rows);
    return res.json(rows);

  })
}
const getCampaigns = (req,res)=>{
  console.log("getting campaigns for "+req.headers.user_id)
  let id = req.headers.user_id;
  let type = req.headers.campaign_type;
  let replacements=[id,type]
  let sql = "SELECT * FROM campaigns WHERE admin_id = ? AND campaign_type = ?"
  sql = mysql.format(sql,replacements);

  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    //console.log(rows);
    return res.json(rows);

  })
}
const getAudiences =(req,res)=>{
  console.log("getting audiences for campaign "+req.headers.campaign_id)
  let sql = "SELECT * FROM audiences WHERE campaign_id = "+req.headers.campaign_id
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);

  })
}
const getAdvertisments =(req,res)=>{
  console.log("getting advertisments for campaign "+req.headers.campaign_id)
  let sql = "SELECT * FROM advertisments WHERE campaign_id = "+req.headers.campaign_id
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);

  })
}
const getScripts =(req,res)=>{
  console.log("getting scripts for advertisment "+req.headers.advertisment_id)
  let SQL = "SELECT * FROM scripts WHERE advertisment_id = ?"
  let replacements=[req.headers.advertisment_id];
  SQL = mysql.format(sql,replacements);

  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);
  })
}
const getAssignments =(req,res)=>{
  console.log("getting assignemnts for advertisment "+req.headers.advertisment_id)
  let SQL = "SELECT * FROM advertAssignments WHERE advertisment_id = ?"
  let replacements=[req.headers.advertisment_id];
  SQL = mysql.format(sql,replacements);

  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);
  })

}

//POST STUFF

const createCampaign = (req,res)=>{
  console.log(req.body)
  console.log("creating new campaign ")
  let sql = "INSERT INTO campaigns (admin_id,campaign_type,campaign_name,campaign_discription) VALUES ( ?, ?,?,?)"
  const {admin_id,campaign_type,campaign_name,campaign_discription} = req.body
  let replacements =[admin_id,campaign_type,campaign_name,campaign_discription]
  sql = mysql.format(sql,replacements)
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);

  })
}

const createAdvertisment = (req,res)=>{
  console.log(req.body)
  console.log("creating new advertisment ")
  let sql = "INSERT INTO advertisments (campaign_id,advertisment_name,is_public) VALUES ( ?, ?,?)"
  const {campaign_id,advertisment_name,is_public} = req.body
  let replacements =[campaign_id,advertisment_name,is_public]
  sql = mysql.format(sql,replacements)
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);

  })
}

const createScript = (req,res)=>{
  console.log(req.body)
  console.log("creating new script ")
  let sql = "INSERT INTO scripts (advertisment_id,script_name,script_content) VALUES ( ?, ?,?)"
  const {advertisment_id,script_name,script_content} = req.body
  let replacements =[advertisment_id,script_name,script_content]
  sql = mysql.format(sql,replacements)
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);

  })
}

const createAdvertAssignment = (req,res)=>{
  console.log(req.body)
  console.log("creating new assignemnt ")
  let sql = "INSERT INTO advertAssignments (advertisment_id, assigned_user) VALUES ( ?, ?)"
  const {advertisment_id, assigned_user} = req.body
  let replacements =[advertisment_id, assigned_user]
  sql = mysql.format(sql,replacements)
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);
  })
}

const createAudience = (req,res)=>{
  console.log(req.body)
  console.log("creating new audience ")
  let sql = "INSERT INTO audiences (campaign_id, influencer_id,influencer_handle,influencer_followers) VALUES ( ?, ?,?,?)"
  const {campaign_id, influencer_id,influencer_handle,influencer_followers} = req.body
  let replacements =[campaign_id, influencer_id,influencer_handle,influencer_followers]
  sql = mysql.format(sql,replacements)
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)
    console.log(rows);
    return res.json(rows);
  })
}
const createAudienceList = (req,res)=>{
  let x = JSON.parse(JSON.stringify(req.body));
  console.log(x);
  console.log("creating new audience list")
  let users = x.users;
  let campaign_id = x.campaign_id
  var values="";
  for(let i=0;i<users.length;i++){
    let x ="("+campaign_id+","+users.influencer_id+","+users.influencer_handle+","+users.influencer_followers+")";
    if(i==users.length-1){  //if its the last one dont add the comma
      values = values + x
    }else{
      values = values + x +","
    }
  }
  console.log(values);
  let sql = "INSERT INTO audiences (campaign_id, influencer_id,influencer_handle,influencer_followers) VALUES "+values
  
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)

    return res.send("If you made it this far and the server hasn't crashed i'd call that a success.")
  })
}
const getIGPage=(req,res)=>{
  let id = req.headers.user_id
  let sql = "SELECT instagramCredentials.account_id, fbCredentials.fb_token FROM fbCredentials LEFT JOIN instagramCredentials ON fbCredentials.user_id = instagramCredentials.user_id WHERE fbCredentials.user_ID = ?"
  let replacements =[id]
  sql = mysql.format(sql,replacements)
  pool.query(sql,(err,rows)=>{
    if( err) return handleSQLError(res,err)


    console.log(rows);
    if(rows.length>=1){
      console.log(rows[0].account_id);
      request.get( "https://graph.facebook.com/v3.2/"+rows[0].account_id+"?fields="+
      "biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website&"+
      "access_token="+rows[0].fb_token
      ,function(error,response,body){
        if(error){
              console.log(error);
        }else{
          console.log(response.body);
          let x = JSON.parse(response.body)
          res.json(x)
          updateIGBasicValues(x,id,res)
        }
    })
    }else{
      console.log("instagram account id not found")
      res.send("instagram account id not found")
    }
   
  
 
}) 
}
function updateIGBasicValues(data,id,res){
  let sql = "SELECT user_id FROM instagramBasicValues WHERE user_id = ?"
  let replacements = [id]
  sql = mysql.format(sql, replacements)

  pool.query(sql,(err,rows)=>{
    if(err) console.log("error");

    console.log(rows.length);
    if(rows.length !=0){
      let sql2 = "UPDATE instagramBasicValues SET biography = ? , followers_count = ? , follows_count = ? , media_count =? , irlname = ? ,username = ? , profile_picture_url = ? WHERE user_id = ?"
      let replacements2 = [data.biography, data.followers_count,data.follows_count,data.media_count,data.name,data.username,data.profile_picture_url, id]
      sql2 = mysql.format(sql2,replacements2);
      pool.query(sql2,(err2,rows2)=>{
        if(err2) return console.log("sql error lmao fix it line 232");

        console.log("Updated instagram basic values")
        console.log(rows2);
      })
    }else{
      let sql3 = "INSERT INTO instagramBasicValues (user_id,biography,followers_count,follows_count,media_count,irlname,username,profile_picture_url) VALUES (?,?,?,?,?,?,?,?)"
      let replacements3 = [id,data.biography, data.followers_count,data.follows_count,data.media_count,data.name,data.username,data.profile_picture_url]
      sql3 = mysql.format(sql3,replacements3);
      pool.query(sql3,(err3,rows3)=>{
        if(err3)console.log("error");

        console.log("Inserted initial instagram basic values")
        console.log(rows3);
      })
    }
  })
}

const igBasicSearch=(req,res)=>{
 
}

const followUser=(req,res)=>{
  const {user_id, following_id} = req.body;
  let unique_id = user_id +"%$"+ following_id
  let sql = "INSERT INTO followingUsers (user_id, following_id, uniqueID) VALUES (?,?,?)"
  let replacements = [user_id,following_id,unique_id];
  sql = mysql.format(sql,replacements);

  pool.query(sql,(err,rows)=>{
    if(err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('No duplicate follows')
      return handleSQLError(res,err);
    }
 
    return res.json(rows)
  })

}

const getAllInfluencers = (req,res)=>{  //basic metrics
  let sql = "SELECT * FROM instagramBasicValues"
  pool.query(sql,(err,rows)=>{
    if(err) return handleSQLError(res,err);

    return res.json(rows);
  })
}


//Gets all the threads connected to the account
const getContacts=(req,res)=>{
  let id = req.headers.user_id
  let sql = "SELECT * from contacts WHERE user_ID = ?"
  let replacements = [id]
  sql = mysql.format(sql,replacements)
  pool.query(sql,(err,rows)=>{
    if(err)return handleSQLError(res,err)

    return res.json(rows);
  })
}

//gets all the messages connected to the thread
const getThread=(req,res)=>{
  let thread_id = req.header.thread_id;
  let sql = "SELECT * from messages WHERE thread_id = ?"
  let replacements = [thread_id];
  sql = mysql.format(sql,replacements);
  pool.query(sql,(err,rows)=>{
    if(err)return handleSQLError(res,err)

    return res.json(rows);
  })
}

const createContact=(req,res)=>{
  const {id,contact_id} = req.body;
  let sql = "INSERT INTO contacts (user_ID, contact_id) VALUES (?,?)"
  let replacements = [id,contact_id]
  sql = mysql.format(sql,replacements);
  pool.query(sql,(err,rows)=>{
    if(err)return handleSQLError(res,err);

    return res.json(rows);
  })
}

const createMessage=(req,res)=>{
  const {sender_id,thread_id,text_content} = req.body;
  let sql = "INSERT INTO messages (sender_id,thread_id,text_content) VALUES (?,?)"
  let replacements = [sender_id,thread_id,text_content];
  sql = mysql.format(sql,replacements);
  pool.query(sql,(err,rows)=>{
    if(err)return handleSQLError(res,err);

    return res.json(rows);
  })
}

const getFollowedUsers = (req,res)=>{
  let id = req.headers.user_id;
  let sql = "SELECT * from followingUsers WHERE user_ID = ?"
  let replacements=[id]
  sql = mysql.format(sql,replacements);
  pool.query(sql,(err,rows)=>{
    if(err)return handleSQLError(res,err);

    return res.json(rows);
  })
}

const getUserPosts = (req,res) =>{
  let id = req.headers.user_id;
  let sql= "SELECT * from posts WHERE user_ID = ?"
  let replacements=[id]
  sql = mysql.format(sql,replacements);
  pool.query(sql,(err,rows)=>{
    if(err)return handleSQLError(res,err);

    return res.json(rows);
  })
}

const getFollowingPosts = (req,res)=>{
  console.log(req.headers);
  let id = req.headers.user_id;
  let followingUsers = req.headers.followedUsers;
  let sql ="SELECT * FROM posts WHERE user_id = ANY (SELECT following_id FROM followingUsers WHERE user_ID = ?)"
  let replacements =[id]
  sql = mysql.format(sql,replacements);

  pool.query(sql,(err,rows)=>{
    if(err){return handleSQLError(res,err)}

    return res.json(rows);
  })
  
}

const createPost = (req,res)=>{
  const {title,content,user_id,username} = req.body;
  let sql = "INSERT INTO posts (user_id,post_title,post_content, username) VALUES (?,?,?,?)"
  let replacements=[user_id, title, content, username];
  sql = mysql.format(sql,replacements);

  pool.query(sql,(err,rows)=>{
    if(err) return handleSQLError(res,err);

    console.log("post created");
    return res.json(rows);
  })
}










  module.exports = {
    createAudienceList,
    createAudience,
    createAdvertAssignment,
    createScript,
    createAdvertisment,
    getAssignments,
    getScripts,
    getAdvertisments,
    getAudiences,
    getCampaign,
    followUser,
    createPost,
    getAllInfluencers,
    getUserPosts,
    getFollowedUsers,
    getFollowingPosts,
    createMessage,
    createContact,
    getThread,
    getContacts,
    createCampaign,
    getIGPage,
    getUser,
    getCampaigns,

  }


