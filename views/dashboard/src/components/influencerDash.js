import React, {Component} from "react";
import { Link } from "react-router-dom"
import openIcon from "../images/openIconWhite.png";
import menuIcon from "../images/menuIconWhite.png";
import $ from "jquery";
class InfluencerDash extends React.Component {
  constructor(){
    super();
    this.state = {
        followingPosts:[],
        noPosts:false,
        followedUsers:[],
        noFollowers:false
    }

  }
  getCookie(name) 
  {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return(match[2])
    }
    else{
        console.log('--could not find cookie---');
    }
  }
  componentDidMount(){
    console.log("INFLUENCER DASHG LOADED")

    this.getIGPage();
    this.getFollowedUsers();
  }
 
  getIGPage(){
    if(this.getCookie("fb_ID") !=undefined){
      $.ajax({
        type:"GET",
        url:  "/api/igPage",
        token:this.getCookie("token"),
        headers:{
          user_id:this.getCookie("user_id")
        },
        success:(response) =>{
         console.log(response)
         this.props.ig(response);
        },
        error:(response)=>{
          console.log("error: "+response)
        }
    })
    }
  }


  getFollowedUsers(){
    if(this.getCookie("fb_ID") !=undefined){
    $.ajax({
      type:"GET",
      url:  "/api/followingUsers",
      token:this.getCookie("token"),
      headers:{
        user_id:this.getCookie("user_id")
      },
      success:(response) =>{
       console.log(response)
       this.setState({followedUsers:response});
       if(response.length>=1){
        this.getFollowedPosts(response);
       }else{
        this.setState({noFollowers:true});
       }
      },
      error:(response)=>{
        console.log("error: "+response)
      }
  })
  }
  }
  getFollowedPosts(followedUsers){
    $.ajax({
      type:"GET",
      url:  "/api/followingPosts",
      token:this.getCookie("token"),
      headers:{
        user_id:this.getCookie("user_id"),
        following_users:followedUsers
      },
      success:(response) =>{
       console.log(response)
       this.setState({followingPosts:response});
      },
      error:(response)=>{
        console.log("error: "+response)
      }
  })
  }

  

  render(){
    return (
      <div className="foreground">
            <h1>Following Feed</h1>
            <div id="followingPostContainer">
              {this.state.noPosts ?
              (
                <div>
                  <p>The people you follow are boring (no posts found)</p>
                </div>
              ):(null)}
                 {this.state.noFollowers ?
              (
                <div>
                  <p>Your not following anybody (no follows found)</p>
                  <Link to="/collabSearch"><h2>Search for other influencers to collab with</h2></Link>
                  <Link to="/advertSearch"><h2>Search for open advertisments brands have posted</h2></Link>

                </div>
              ):(null)}
              {this.state.followingPosts.map((item,index)=>{
                console.log(item);
               return(
                 <div>
                   <h2>{item.post_title}</h2>
                   <h2>{item.post_username}</h2>
                   <p>{item.post_content}</p>
                 </div>
               )
              })}
            </div>
      </div>
    );
  }
}

export default InfluencerDash;
