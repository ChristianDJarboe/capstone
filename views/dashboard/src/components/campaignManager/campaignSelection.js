import React, {Component} from "react";
import LineGraph from "../graphs/lineGraph";
import $ from "jquery";
import { Link } from "react-router-dom"


import fileIcon from "./images/fileIconWhite.png"
import plusIcon from "./images/plusIconWhite.png"

//DEPRECIATED?????
export default class CampaignSelection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        newCampaignPopup:false,
        newCampaignForm:{
          name:"",
          discription:"",
        },
        simulatedCampaigns:[
         
        ],
        activeCampaigns:[
            //Only simulated campaigns exist in this version

        ],
        completedCampaigns:[
            //Only simulated campaigns exist in this version

        ],

        noActive:true,
        noSimulated:true,
        noCompleted:true

    }
    this.newCampaign = this.newCampaign.bind(this);
}
  componentDidMount(){
    this.getCampaigns();
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
  getCampaigns(){
      //Only simulated campaigns exist in this version sorry not sorry
    $.ajax({
      type:"GET",
      url:  "/api/campaigns",
      token:this.getCookie("token"),
      headers:{
        user_id:this.getCookie("user_id"),
        campaign_type:"simulated"
      },
      success:(response) =>{
        console.log(response);
        this.setState({simulatedCampaigns:response});
        console.log(this.props);
        this.props.campaigns(response)
      },
      error:(response)=>{
          alert("error finding campaigns who knows why lmao")
      }
  })
  }


  
  updateForm(e){
    let key = e.target.name;
    let value = e.target.value;
    let x = this.state.newCampaignForm
    x[key]=value;
    this.setState({newCampaignForm:x});
  }

  newCampaign(){
    console.log("new campaign");
    let data ={
      admin_id: this.getCookie("user_id"),
      campaign_type: "simulated",
      campaign_name: this.state.newCampaignForm.name,
      campaign_discription:  this.state.newCampaignForm.discription
    }
    $.ajax({
      type:"POST",
      url:  "/api/create-campaign",
      token:this.getCookie("token"),
      data:data,
      success:(response) =>{
        console.log(response);
        this.getCampaigns()
      },
      error:(response)=>{
          alert("error creating campaign")
      }
  })
  }

 
  deleteCampaign(){
    console.log("delete campaign");

  }
  copyCampaign(){
    console.log("copy campaign");
  }
  pranked(msg){
    prompt("Wouldn't it be cool if this worked? "+msg)
  }
  render(){
      return(
        <div id="campaignSelection" className="foreground">
          <div id="campaignSelectionHeader">
          <h1>Campaign Selection</h1>
            {this.state.newCampaignPopup ?(
              <button onClick={(e)=>{this.setState({newCampaignPopup:false})}}>New Campaign</button>
            ):(
              <button onClick={(e)=>{this.setState({newCampaignPopup:true})}}>New Campaign</button>
            )}
          </div>
          {this.state.newCampaignPopup ?(
            <div id="newCampaignPopup">
              <h1>Create a new campaign</h1>
              <div id="newCampaignForm">
             
                  <div id="campaignFormLeft">
                    <input  autocomplete="off"  placeholder="Name" type="text" name="name" onChange={(e)=>{this.updateForm(e)}} value={this.state.newCampaignForm.name}></input>
                    <textarea autocomplete="off"  rows={30} col={40} placeholder="Discription" name="discription" onChange={(e)=>{this.updateForm(e)}} value={this.state.newCampaignForm.discription}></textarea>
                  </div>
                  <div id="campaignFormRight">
                    <div id="importSelection">
                      <h1>Imports</h1>
                      <div>
                        <button onClick={()=>{this.pranked("Cannot import creators")}}>Creators</button>
                        <button onClick={()=>{this.pranked("Cannot import scripts")}}>Scripts</button>
                        <button onClick={()=>{this.pranked("Cannot import contracts")}}>Contracts</button>
                      </div>
                    </div>
   
                    <div id="platformSelection">
                      <h1>Platforms</h1>
                      <div>
                        <div className="pee">
                          <label for="platform-yt">Youtube</label>
                          <input onChange={()=>{this.pranked("These checkboxes mean nothing, as instagram is our only platform and its hardcoded")}} name="platform-yt"type="checkbox"></input>
                        </div>
                        <div className="pee">
                          <label for="platform-yt">Instagram</label>
                          <input onChange={()=>{this.pranked("These checkboxes mean nothing, as instagram is our only platform and its hardcoded")}}name="platform-yt"type="checkbox"></input>
                        </div>
                        <div className="pee">
                          <label for="platform-yt">Twitch</label>
                          <input onChange={()=>{this.pranked("These checkboxes mean nothing, as instagram is our only platform and its hardcoded")}}name="platform-yt"type="checkbox"></input>
                        </div>
                      </div>
                    </div>

                    <div id="yeety">
                      <button onClick={()=>{this.newCampaign()}}>Create Campaign</button>
                      <button onClick={()=>{this.setState({newCampaignPopup:false})}}>Cancel</button>
                    </div>
                </div>
               
           


              </div>
            </div>
          ):(null)}
          <div>
            <div id="selectionFeed">
            <div>
              <div id="simulatedCampaigns" className="campaignOptions">
                <h1>Simulated Campaigns</h1>
                {this.state.simulatedCampaigns.map((item,index)=>{
                  let link = "/dashboard/campaign/"+item.id;
                  return(
                  <div class="campaignOption" key={index}>
                    <div>
                      <h1>{item.campaign_name}</h1>
                      <h2>Simulated</h2>
                    </div>
                    <div>
                      <Link to ={link}>
                        <button >Open</button>
                      </Link>
                      <button onClick={()=>{this.copyCampaign(item.id)}}>Copy</button>
                      <button onClick={()=>{this.pranked("")}}>Move to</button>
                      <button onClick={()=>{this.deleteCampaign(item.id)}}>Delete</button>
                    </div>
                  </div>
                  )
                })}
                {this.state.noSimulated ?(
                  <div><h2>Could not find any simulated campaigns</h2></div>
                ):(null)}
              </div>
              <div id="activeCampaigns" className="campaignOptions">
              <h1>Active Campaigns</h1>
              <h3>*Coming soon</h3>
              {this.state.activeCampaigns.map((item,index)=>{
                  return(
                  <div class="campaignOption">
                    <div>
                      <h1>{item.name}</h1>
                      <h2>Active</h2>
                    </div>
                    <div>
                      <button onClick={()=>{this.pranked("")}}>Open</button>
                      <button onClick={()=>{this.pranked("")}}>Copy</button>
                      <button onClick={()=>{this.pranked("")}}>Move to</button>
                      <button onClick={()=>{this.pranked("")}}>Delete</button>
                    </div>
                  </div>
                  )
                })}
                 {this.state.noActive ?(
                  <div><h2>Could not find any active campaigns</h2></div>
                ):(null)}
              </div>
              <div id="completeCampaigns" className="campaignOptions">
              <h1>Complete Campaigns</h1>
              <h3>*Coming soon</h3>
              {this.state.completedCampaigns.map((item,index)=>{
                  return(
                  <div class="campaignOption">
                    <div>
                      <h1>{item.name}</h1>
                      <h2>Finished</h2>
                    </div>
                    <div>
                      <button onClick={()=>{this.pranked("")}}>Open</button>
                      <button onClick={()=>{this.pranked("")}}>Copy</button>
                      <button onClick={()=>{this.pranked("")}}>Move to</button>
                      <button onClick={()=>{this.pranked("")}}>Delete</button>
                    </div>
                  </div>
                  )
                })}
                 {this.state.noCompleted ?(
                  <div><h2>Could not find any completed campaigns</h2></div>
                ):(null)}
              </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

