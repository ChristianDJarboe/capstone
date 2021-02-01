import './App.css';
import React, {Component} from "react";
import $ from 'jquery'
import Router from "./router";
import { Link } from "react-router-dom"
import { BrowserRouter } from "react-router-dom";
import Header from "./containers/header";
import Public from "./publicLanding";

import { Provider } from 'react-redux'
import store from './redux/store'

//IMAGES
import campaignIcon from "./images/campaignIconWhite.png"
import compareIcon from "./images/compareIconWhite.png"
import contractIcon from "./images/contractIconWhite.png"
import searchIcon from "./images/searchIconWhite.png"


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      portalURL:"https://1c353115f1c0.ngrok.io",
      fbPrompt:false,
      fbData:{},
      user_type:""
    }
    this.FBLink = this.FBLink.bind(this);
    this.getFBStuff = this.getFBStuff.bind(this);
    this.logout = this.logout.bind(this);

  }
  componentDidMount(){
    //Checks if login token is stored in cookie
    //If false return public landing
    //If true return dashboard app
    this.onload();
  }
  onload(){
    var token = this.getCookie("token")
    var user_id = this.getCookie("user_id")
    console.log(token+" "+user_id);
    if(token!=undefined || user_id!=undefined){
      console.log("Found Our Tokens: "+ token+" "+user_id);
      this.getFBStuff();
    }else{
      window.location.href = this.state.portalURL+"/";
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
  logout(p){
    console.log("logout");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = this.state.portalURL+"/";
  }

  setCookies(token,user_id) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = "token" + '=' + token + ';expires=' + expires.toUTCString();
    document.cookie = "user_id" + '=' + user_id + ';expires=' + expires.toUTCString();
  }

  FBLink(){
        
    console.log("FB Login");
  
        window.FB.login(function(response){
            let url = process.env.ngrok;
            console.log(url);
            const getCookie= (name)=>{
              var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
              if (match) {
                return(match[2])
              }
              else{
                  console.log('--could not find cookie---');
              }
            }
              console.log(response)
              let data ={
                user_ID:getCookie("user_id"),
                fb_ID:response.authResponse.userID,
                expiresIn:response.authResponse.expiresIn,
                fb_token:response.authResponse.accessToken,
                fb_signedReq:response.authResponse.signedRequest
              }
              $.ajax({
                type:"POST",
                url:"/auth/insertFBCredentials",
                data:JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
          
                success:(response) =>{
                    console.log("Fb Credentials Inserted")
                    window.location.reload(true)
                  },
                error:(response)=>{
                  console.log(response)
                }
            }
            )
      
            },{scope:'instagram_basic,pages_show_list,instagram_basic,instagram_manage_insights,pages_read_engagement,pages_show_list'});
  }

  getFBStuff(){
    let token = this.getCookie("token");
    let id = this.getCookie("user_id");
    $.ajax({
        type:"GET",
        url:  "/auth/fbCred",
        token:token,
        success:(response) =>{
          console.log(response)
          var expires = new Date();
          expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
          document.cookie = "fb_ID" + '=' + response[0].fb_ID + ';expires=' + expires.toUTCString();

          this.setState({fbData:response});
          this.setState({fbPrompt:false});
        },
        error:(response)=>{
            console.log("error:");
            console.log(response);
            this.setState({fbPrompt:true});

        }
    })
  }

  render(){
      return (
        <div>
          {this.state.fbPrompt ?
          (
            <div id="fbPrompt">
              <h2>Please verifiy your account by connecting it to facebook.</h2>
              <button onClick={()=>{this.FBLink()}}>Link FaceBook</button>
              <p>I chose to use facebook to verify our users for a few reasons.
                <br></br>
                <p>
                  1. The only influencer platform we support is Instagram and we would need all out infulencers to connect their accounts anyways
                </p>
                <p>
                  2. UHHh cause i want to steal your data of course lamao oo hahah
                </p>
              </p>
            </div>
          ):(
            <Provider store={store}>
            <BrowserRouter>
            <div>
            
              <Header></Header>
              <Router></Router>
            </div>
            </BrowserRouter>
          </Provider>
          )}
        </div>
      );
  }
}

export default App;
