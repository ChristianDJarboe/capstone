
import React, {Component} from "react";
import LineGraph from "../graphs/lineGraph";
import $ from "jquery";
import { Link } from "react-router-dom"

import fileIcon from "./images/fileIconWhite.png"
import plusIcon from "./images/plusIconWhite.png"



export default class CampaignManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data:props.data,

        strategyOption:"Strategy",
        foreground:"",

        simulatedCampaigns:[],
        noCampaigns:true,

        scriptsOpen:false,
        advertismentsOpen:false,
        strategyOptionsOpen:false,
        audienceOpen:false,
        campaignHomeOpen:true,

        scripts:[],
        noScripts:true,
        advertisments:[],
        noAdvertisments:true,
        audiences:[],
        noAudiences:true,
        assignments:[],
        noAssignments:true,

        campaignData:{}
    }
    this.getData = this.getData.bind(this);
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
    this.getData(this.props.data.id)
    this.getCampaigns()

  }
  getCampaigns(){
    //Only simulated campaigns exist in this version sorry not sorry
    $.ajax({
      type:"GET",
      url:  "/api/campaigns",
      token:this.getCookie("token"),
      headers:{
        user_id:this.getCookie("user_id"),
        campaign_type:"simulated",
        token:this.getCookie("token")
      },
      success:(response) =>{
        console.log(response);
        if(response.length >=1){
          this.setState({simulatedCampaigns:response});
          this.setState({noCampaigns:false});
        }
      },
      error:(response)=>{
          alert("error finding campaigns who knows why lmao")
      }
    })
  }

  getData(id){
    $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/campaign",
      token:this.getCookie("token"),
      headers:{campaign_id:id, user_id:this.getCookie("user_id"), token:this.getCookie("token")},
      success:(response)=>{
          console.log(response[0]);
          this.setState({campaignData:response[0]});
          this.getAdverts(response[0].id)
          this.getAudience(response[0].id)
      },
      error:(response)=>{
          console.log("error:");
          console.log(response);
      }
  })
  }

  getScipts(advert_id){
    $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/scripts",
      token:this.getCookie("token"),
      headers:{
        advertisment_id:advert_id,
        user_id:this.getCookie("user_id"),
        token:this.getCookie("token")
      },
      success:(response)=>{
          console.log(response);
      
          if(response.length>=1){
            this.setState({scripts:response});
            this.setState({noScripts:false})
          }
      },
      error:(response)=>{
          console.log("error:");
          console.log(response);
      }
  })
  }
  getAdverts(campaign_id){
    $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/advertisments",
      token:this.getCookie("token"),
      headers:{
        campaign_id:campaign_id,
        user_id:this.getCookie("user_id"),
        token:this.getCookie("token")
      },
      success:(response)=>{
          console.log(response);
          if(response.length>=1){
            this.setState({advertisments:response});
            this.setState({noAdvertisments:false})
          }
      },
      error:(response)=>{
          console.log("error:");
          console.log(response);
      }
  })
  }
  getAudience(campaign_id){
    $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/audiences",
      token:this.getCookie("token"),
      headers:{
        campaign_id:campaign_id,
        user_id:this.getCookie("user_id"),
        token:this.getCookie("token")
      },
      success:(response)=>{
          console.log(response);
          if(response.length>0){
            console.log("response > 0")
            this.setState({audiences:response});
            this.setState({noAudiences:false})
          }
      },
      error:(response)=>{
          console.log("error:");
          console.log(response);
      }
  })
  }
  getAssignments(advert_id){
    $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/assignments",
      token:this.getCookie("token"),
      headers:{
        advertisment_id:advert_id,
        user_id:this.getCookie("user_id"),
        token:this.getCookie("token")
      },
      success:(response)=>{
          console.log(response);
          if(response.length>=1){
            this.setState({assignments:response});
            this.setState({noAssignments:false})
          }
      },
      error:(response)=>{
          console.log("error:");
          console.log(response);
      }
  })
  }

  foreground(newForeground){
    console.log(newForeground)
    if(newForeground == "scripts"){
      this.setState({scriptsOpen:true})
    }else{this.setState({scriptsOpen:false})}
    if(newForeground == "advertisments"){
      this.setState({advertismentsOpen:true})
    }else{this.setState({advertismentsOpen:false})}
    if(newForeground == "home"){
      this.setState({campaignHomeOpen:true})
    }else{this.setState({campaignHomeOpen:false})}
    if(newForeground == "audience"){
      this.setState({audienceOpen:true})
    }else{this.setState({audienceOpen:false})}
  }
  toggle(input){
    let flop;
    if(this.state[input] == true){
      flop = false;
    }else{
      flop = true;
    }
    this.setState({[input]:flop})
  }
  openAudienceSearch(){
    
  }


  render(){
      return (

        <div id="campaignTools" className="foreground">
          <div className="toolHeader">
            <h1 onClick={()=>{
              this.foreground("home");
              this.setState({strategyOption:"Strategy"});
 
              this.setState({strategyOptionsOpen:false});
             }}>Campaign Manager</h1>
            <div class="toolSubHeader">
             <h1>{this.state.campaignData.campaign_name}</h1>
             <img src={fileIcon} onClick={()=>{this.toggle("campaignSelectOpen") }}></img>
             {this.state.campaignSelectOpen ?
             (
              <div>
                {this.state.noCampaigns ? (<div>No Campaigns</div>)
                :
                (
                <div>
                  <h3>Campaigns</h3>
                  {this.state.simulatedCampaigns.map((item,index)=>{
                    let link = "/dashboard/campaign/"+item.id
                    return(
                      <div key={index}>
                        <Link to={link} onClick={()=>{this.getData(item.id)}}>
                          <h3>{item.campaign_name}</h3>
                        </Link>
                      </div>
                    )
                  })}
                </div>
                )}
              </div>
             ):(null)}
             <img src={plusIcon}></img>
             <div>
               {this.state.strategyOptionsOpen ? 
               (
                 <button id="stratButton" className="subHeaderButton" onClick={()=>{this.setState({strategyOptionsOpen:false})}}>Strategy</button>
               ):(
                 <button id="stratButton" className="subHeaderButton" onClick={()=>{this.setState({strategyOptionsOpen:true})}}>{this.state.strategyOption}</button>
               )}
               {this.state.strategyOptionsOpen ? 
               (
                 <div id="strategyOptionContainer">
                   <button 
                     onClick={()=>{
                       this.setState({strategyOption:"Scripts"});
                       this.setState({strategyOptionsOpen:false});
                       this.foreground("scripts");
                     }}>
                     Scripts
                   </button>
                   <button 
                     onClick={()=>{
                       this.setState({strategyOption:"Advertisments"});
                       this.setState({strategyOptionsOpen:false});
                       this.foreground("advertisments")
                     }}>
                     Adverts
                   </button>
                   <button 
                     onClick={()=>{
                       this.setState({strategyOption:"Audience"});
                       this.setState({strategyOptionsOpen:false})
                       this.foreground("audience")
                     }}>
                     Audience
                   </button>
                 </div>
               ):(null)}
             </div>
            </div>
          </div>
         <div className="toolBody">
            {
              this.state.campaignHomeOpen ? 
              (
                <div className="strategyComponent">
                  <h1>Home</h1>
                  <div id="homeBody">
                    <h2>{this.state.campaignData.campaign_name}</h2>
                    <h2>{this.state.campaignData.campaign_discription}</h2>
                    <p>This is where performance metrics for your campaign will appear. They dont exist yet because this is a simulated campaign. Funny how that works.</p>
                  </div>
                </div>
              ):(null)
            }
            {
              this.state.advertismentsOpen ?
              (
                <div className="strategyComponent">
                  <div className="strategyComponentHeader">
                    <h1>Advertisments</h1>
                    <button onClick={()=>{}}>Create Advertisment</button>
                  </div>

                  <div className="strategyComponentBody">
          
                    {this.state.noAdvertisments ?(
                      <div>No Advertisments Found</div>
                    ):(null)}

                    {this.state.advertisments.map((item,index)=>{
                      return(
                        <div>
                          <h2>{item.name}</h2>
                        </div>
                      )
                    })}

                    <h2>End of list.</h2>
                  </div>



            
                </div>
              ):(null)
            }
             {
              this.state.audienceOpen ?
              (
                <div className="strategyComponent">
                  <div className="strategyComponentHeader">
                    <h1>Audience</h1>
                    <Link to="/dashboard/audiencesearch">
                    <button onClick={()=>{}}>Search</button>
                    </Link>
                  </div>

                  <div className="strategyComponentBody">
                    <p>When your searching for an audience you are at the same time, searching for an influencer. Because the audience surrounds that influencer. Which makes this part of the website weird because its about searching for "audiences" but really your are searching for influencers. Wack</p>
                    {this.state.noAudiences ?(
                      <div>No Audiences Found</div>
                    ):(null)}

                    {this.state.audiences.map((item,index)=>{
                      return(
                        <div>
                          <h2>{item.influencer_handle}</h2>
                          <h3>{item.influencer_followers}</h3>
                        </div>
                      )
                  
                    })}

                    <h2>End of list.</h2>
                    <Link to="/dashboard/audiencesearch">
                      <button onClick={()=>{}}>Find more audiences</button>
                    </Link>
                  </div>
                
                </div>
              ):(null)
            }
             {
              this.state.scriptsOpen ?
              (
                <div className="strategyComponent">
                  <h1>Scripts</h1>
                  {this.state.noAdvertisments ?(
                    <div>No Scripts Found</div>
                  ):(null)}
                </div>
              ):(null)
            }
          </div>
        </div>
     );
    }
}




