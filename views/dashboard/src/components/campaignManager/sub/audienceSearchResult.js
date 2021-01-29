import React, {Component} from "react";
import $ from "jquery";

class AudienceSearchResult extends React.Component {
 constructor(props){
    super(props);
    this.state = {
        addOpen:false
    }
  

  }
  componentDidMount(){
    console.log(this.props);
  }



  render(){
      return (
        <div className="audienceSearchResult">
          <h1>{this.props.data.username}</h1>
          <p>{this.props.data.biography}</p>
          <h3>{this.props.data.followers_count}</h3>
          <h3>{this.props.data.media_count}</h3>
          <img src={this.props.data.profile_picture_url}></img>
          <button onClick={()=>{this.props.createContact(this.props.data.user_id)}}>Contact</button>
          <button onClick={()=>{this.setState({addOpen:true})}}>Add to campaign</button>
          {
            this.state.addOpen ?(
              <div>
                {this.props.campaigns.map((item2,index)=>{
                  return(
                    <button onClick={()=>{this.props.addUserToCampaign(this.props.data,item2.id)}}>Add to {item2.campaign_type} campaign, {item2.campaign_name}</button>
                  )
                  
                })}
                <button onClick={()=>{this.setState({addOpen:false})}}>Cancel</button>
              </div>
            ):(null)
          }
        </div>
      );
  }
}

export default AudienceSearchResult;
