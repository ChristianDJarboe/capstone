import React, {Component} from "react";
import $ from 'jquery'



class InfluencerAccount extends React.Component {
  constructor(){
    super();
    this.state = {
      igValues:{}
    }
  
  }
  componentDidMount(){
    console.log(this.props.ig);
    this.setState({igValues:this.props.ig})
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

  render(){
      return (
      <div className="foreground">
        <h1>Your Account</h1>
        <h2>Handle: {this.state.igValues.username}</h2>
        <h3>Bio: {this.state.igValues.biography}</h3>
        <h3>Follows: {this.state.igValues.follows_count}</h3>
        <h3>Followers: {this.state.igValues.followers_count}</h3>
        <h3>Posts: {this.state.igValues.media_count}</h3>
        <img src={this.state.igValues.profile_picture_url}></img>

      </div>
      );
  }
}

export default InfluencerAccount;
