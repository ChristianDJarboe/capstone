import React, {Component} from "react";
import $ from "jquery";
import AudienceSearchResult from "./sub/audienceSearchResult"

class AudienceSearch extends React.Component {
 constructor(props){
    super(props);
    this.state = {
      users:[],
      noUsers:false,
      selectedUsers:[],
      sendListOpen:false
    }
  
    this.getUsers = this.getUsers.bind(this)
    this.addUserToCampaign = this.addUserToCampaign.bind(this)

  }
  componentDidMount(){
    console.log(this.props);
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
  createContact(new_contact_id){
    console.log("create contact "+new_contact_id)
    
  }

  addUserToCampaign(user,campaign_id){
    console.log("Add user "+user.id+" to "+campaign_id)
    let data ={
      campaign_id:campaign_id,
      influencer_id:user.id,
      influencer_handle:user.username,
      influencer_followers:user.followers_count
    }
    $.ajax({
      type:"POST",
      url:  "/api/createAudience",
      token:this.getCookie("token"),
      data:data,
      success:(response) =>{
       console.log(response)
        alert("user added to campaign")
      },
      error:(response)=>{
        console.log("error: "+response)
      }
  })
  }
  //A boyhood dream
  // addToList(user){
  //   let x = this.state.selectedUsers;
  //   let data ={
  //     influencer_id:user.id,
  //     influencer_handle:user.username,
  //     influencer_followers:user.followers_count
  //   }
  //   x.push(data);
  //   this.setState({selectedUsers:x})
  // }
  // sendListToCampaign(campaign_id){ 
  //   let h =this.state.selectedUsers 
  //   let data ={
  //     users:h,
  //     campaign_id:campaign_id
  //   };
  //   console.log(data);
  //     $.ajax({
  //       type:"POST",
  //       url:  "/api/createAudienceList",
  //       token:this.getCookie("token"),
  //       data:data,
  //       success:(response) =>{
  //        console.log(response)
  //       },
  //       error:(response)=>{
  //         console.log("error: "+response)
  //       }
  //   })
    
  // }
  render(){
      return (
      <div className="foreground">
        <h2>Find Influencers to collaborate with</h2>
        <div id="resultsFeedContainer">
          {this.state.noUsers ?(
            <div>
              <p>No users found. Could be my fault. Could be there are legit no users. Who's to say.</p>
            </div>
          ):(null)}
          {this.state.users.map((item,index)=>{
            if(item.username !=null){
              return(
                <AudienceSearchResult
                campaigns={this.props.campaigns} 
                data={item}
                addToList ={this.addToList} 
                addUserToCampaign={this.addUserToCampaign}
                createContact={this.createContact}
                ></AudienceSearchResult>
              )
            }else{
              console.log("there is a user here, but they fucked up somehow and didnt link instagram properly. totally not my fault. id: "+item.id)
            }
            
          })}
        </div>
        {/* <div id="selectedResults">    Just fix this some other day lol
          <button onClick={()=>{this.setState({sendListOpen:true})}}>Send To Campaign</button>
          {this.state.sendListOpen ?(
            <div>
             <div>
                {this.props.campaigns.map((item2,index)=>{
                  return(
                    <button onClick={()=>{this.sendListToCampaign(item2.id)}}>Add to {item2.campaign_type} campaign, "{item2.campaign_name}"</button>
                  )
                  
                })}
                <button onClick={()=>{this.setState({sendListOpen:false})}}>Cancel</button>
              </div>
            </div>
          ):null}
          {this.state.selectedUsers.map((item,index)=>{
            return(
              <div>
                <h2>{item.username}</h2>
                <button>Remove</button>
              </div>
            )
          })}
        </div> */}
      </div>
      );
  }
}

export default AudienceSearch;
