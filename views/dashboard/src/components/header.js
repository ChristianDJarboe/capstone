import React, {Component} from "react";
import $ from 'jquery'
import { Link } from "react-router-dom"
//IMAGES
import campaignIcon from "../images/campaignIconWhite.png"
import compareIcon from "../images/compareIconWhite.png"
import contractIcon from "../images/contractIconWhite.png"
import searchIcon from "../images/searchIconWhite.png"



class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName:"User name here",
      headerMenuIsOpen:false,
      leftPanelCollapsed:true,
      brand:false,
      influencer:false,
      selectedThread:[],
      contacts:[],
      messengerOpen:false,
      portalURL:"https://ef206a96d208.ngrok.io",
      createPostOpen:false,

      newPostTitle:"",
      newPostContent:""

    }
    this.getUser = this.getUser.bind(this);
  }
  componentDidMount(){
    this.getUser();
    this.getContacts();
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
  logout(){
      console.log("logout");
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "fb_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "/";
  }
  getUser(){
    $.ajax({
      type:"GET",
      url:  "/api/user",
      token:this.getCookie("token"),
      success:(response) =>{
        console.log(response);
          this.setState({userName:response.account_name});
          if(response[0].user_type =="brand"){
             this.setState({brand:"true"})
             console.log("brand header set")
          }else
          if(response[0].user_type =="influencer"){
            this.setState({influencer:"true"})
            console.log("influencer header set")

          }
      },
      error:(response)=>{
          alert("cound not find user data")
      }
  })
  }
  getContacts(){
    $.ajax({
      type:"GET",
      url:  "/api/contacts",
      token:this.getCookie("token"),
      headers:{
        user_id:this.getCookie("user_id")
      },
      success:(response) =>{
        console.log(response);
        this.setState({contacts:response});
      },
      error:(response)=>{
          alert("cound not find contacts data")
      }
  })
  }
  
  createPost(){
    let data = {
      user_id:this.getCookie("user_id"),
      title: this.state.newPostTitle,
      content: this.state.newPostContent,
      username: this.state.userName
    }
    console.log(data);
    this.setState({createPostOpen:false});
    $.ajax({
      type:"POST",
      url:  "/api/createPost",
      token:this.getCookie("token"),
      data:data,
      success:(response) =>{
        console.log(response);
      },
      error:(response)=>{
          alert("cound not find contacts data")
      }
  })
  }

  render(){
    return (
      <div className="fixedContainer">
        {this.state.messengerOpen ?
        (
          <div id="messengerContainer">
            <div id="messengerHeader">
              <button onClick={()=>{console.log("close");this.setState({messengerOpen:false})}}>Close Messenger</button>
            </div>
            <div id="messengerBody">
              <div id="selectedThread">
                <div>
                  <h1>Contact Name</h1>
                </div>
                {this.state.selectedThread.map((item,index)=>{
                  return(
                  <div className="messageCard">
                    <p></p>
                    <h3>Timestamp</h3>
                  </div>
                  )
                })}
      
              </div>
              <div id="contactsAside">
                <div>
                  <form>
                    <input type="text" placeholder="Contacts"></input>
                  </form>
                </div>
                <div>
                  {this.state.contacts.map((item,index)=>{
                    <div>
                      <h2>Contact Name</h2>
                      <h3>Last message date</h3>
                    </div>
                  })}
                
                </div>
              </div>
            </div>
          
          </div>
        ):(null)}
        {this.state.createPostOpen ?(
          <div id="createPostContainer">
            <div id="createPostHeader">
              <button onClick={()=>{this.setState({createPostOpen:false})}}>Cancel</button>

            </div>
            <form onSubmit={(e)=>{e.preventDefault()}}>
              <input placeholder="Post Title" value={this.state.newPostTitle} onChange={(e)=>{this.setState({newPostTitle:e.target.value})}}></input>
              <textarea value={this.state.newPostContent} rows={20} cols={40} placeholder="Post Content" onChange={(e)=>{this.setState({newPostContent:e.target.value})}}>

              </textarea>
              <button onClick={()=>{this.createPost()}}>Post</button>
            </form>
          </div>
        ):(null)}
       

        <header className="App-header">
          <div>
            {this.state.leftPanelCollapsed ?
            (
              <button id="leftPanelButton" onClick ={()=>{this.setState({leftPanelCollapsed:false}); $("#foreground").css("left","200px")    }}>&#9776;</button>
            ):(
              <button  id="leftPanelButton" onClick ={()=>{this.setState({leftPanelCollapsed:true}); $("#foreground").css("left","80px") }}>&#9776;</button>
              )}
            <Link to="/dashboard">Logo</Link>
          </div>
          <div>
            <form id="searchBarContainer">
              <input type="search" id="searchBar" placeholder="Search for anything"></input>
              <button id="searchButton">
                <img style={{width:30}} src={searchIcon}></img>
              </button>
            </form>
          </div>
          <div id="headerMenuContainer">
            {this.state.headerMenuIsOpen ?
              (
                <div>
                  <button id="openDropDownMenu" onClick={()=>this.setState({headerMenuIsOpen:false})}>&#9776; {this.state.userName}</button>
                  <div class="dropDownMenu">
                    <button class="headerMenuButton">Profile</button>
                    <button>Settings</button>
                    <button>Help</button>
                    <button onClick={()=>{this.logout()}}>Logout</button>
                  </div>
                </div>
              )
            :         
              <button id="openDropDownMenu" onClick={()=>this.setState({headerMenuIsOpen:true})}>&#9776; {this.state.userName}</button>
            }
          </div>
        </header>
        <div>
          {this.state.brand ?
          (
            <div>
              {this.state.leftPanelCollapsed ?(
                <div id="leftPanel" className="collapsed">
                  <button onClick={()=>{this.setState({messengerOpen:true})}}>MSG</button>
                </div>
              ):(
                <div id="leftPanel" className="expanded">
                  <button onClick={()=>{this.setState({messengerOpen:true})}}>Messenger</button>
                </div>
              )}
            </div>
          ):(null)}
          {this.state.influencer ?(
            <div>
            {this.state.leftPanelCollapsed ?(
              <div id="leftPanel" className="collapsed">
                <Link to="/collabSearch">
                  <h3 className="leftPanelButton">S.F.C.</h3>
                </Link>
                <Link to="/advertSearch">
                  <h3 className="leftPanelButton">S.F.A.</h3>
                </Link>
                <Link to="/myContracts">
                  <h3 className="leftPanelButton">M.C.</h3>
                </Link>
                <Link to="/influencerAccount">
                  <h3 className="leftPanelButton">Acc</h3>
                </Link>
                <button onClick={()=>{this.setState({messengerOpen:true})}}>MSG</button>
                <button onClick={()=>{console.log("post prompt open");this.setState({createPostOpen:true})}}>Post</button>

              </div>
            ):(
              <div id="leftPanel" className="expanded">
                <Link to="/collabSearch">
                  <h3>Collab Search</h3>
                </Link>
                <Link to="/advertSearch">
                  <h3>Advert Search</h3>
                </Link>
                <Link to="/myContracts">
                  <h3>My Contracts</h3>
                </Link>
                <Link to="/influencerAccount">
                  <h3>Account</h3>
                </Link>
                <button onClick={()=>{this.setState({messengerOpen:true})}}>Messenger</button>
                <button onClick={()=>{this.setState({messengerOpen:true})}}>Post</button>

              </div>
            )}
          </div>
          ):(null)}
        </div>
      </div>
    );
  }
}

export default Header;
