import React, {Component} from "react";
import $ from 'jquery'



class AdvertSearch extends React.Component {
  constructor(){
    super();
    this.state = {
    
    }
  

  }
  componentDidMount(){
    
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
      <div  className="foreground">AdvertSearch</div>
      );
  }
}

export default AdvertSearch;
