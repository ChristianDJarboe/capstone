import React, {Component} from "react";
import $ from 'jquery'



class CollabSearch extends React.Component {
  constructor(){
    super();
    this.state = {
      users:[],
      noUsers:false
    }
  
    this.getUsers = this.getUsers.bind(this)
  }
  componentDidMount(){
    this.getUsers();
  }
  getUsers(){
    $.ajax({
      type:"GET",
      url:  "/api/allInfluencers",
      token:this.getCookie("token"),
      success:(response) =>{
       console.log(response)
        this.setState({users:response})
        if(response.length ==0){
          this.setState({noUsers:true})
        }
      },
      error:(response)=>{
        console.log("error: "+response)
      }
  })
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
  followUser(follow_id){
    console.log(follow_id)
    let data ={
      user_id:this.getCookie("user_id"),
      following_id:follow_id
    }
    $.ajax({
      type:"POST",
      url:  "/api/createFollow",
      token:this.getCookie("token"),
      data:data,
      success:(response) =>{
       console.log(response)
      },
      error:(response)=>{
        console.log("error: "+response)
      }
  })
}

  render(){
      return (
      <div className="foreground">
        <h2>Find Influencers to collaborate with</h2>
        <div>
          {this.state.noUsers ?(
            <div>
              <p>No users found. Could be my fault. Could be there are legit no users. Who's to say.</p>
            </div>
          ):(null)}
          {this.state.users.map((item,index)=>{
            return(
              <div>
                <h1>{item.username}</h1>
                <p>{item.biography}</p>
                <img src={item.profile_picture_url}></img>
                <button onClick={()=>{this.followUser(item.user_id)}}>Follow</button>
              </div>
            )
          })}
        </div>
      </div>
      );
  }
}

export default CollabSearch;
