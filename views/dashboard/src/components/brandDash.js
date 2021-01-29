import React, {Component} from "react";
import { Link } from "react-router-dom"
import openIcon from "../images/openIconWhite.png";
import menuIcon from "../images/menuIconWhite.png";
import $ from "jquery";
import CampaignSelection from "../containers/campaignSelection";


class BrandDash extends React.Component {
  constructor(){
    super();
    this.state = {
        followingFeed:[]
    }
    console.log("nignog");
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

    // this.getAccountMetrics();
    // this.getCampaigns();
    // this.getCampaignEvents();

  }

//   getAccountMetrics(){
//     let data;
//     let token = this.getCookie("token");
//     $.ajax({
//         type:"GET",
//         url: "http://localhost:8080/api/brand-metrics",
//         token:token,
//         headers:{user_id:this.getCookie("user_id")},
//         success:(response) =>{
//         data=response[0];
//         console.log(data);
//         this.setState({accountMetrics:data})

//         },
//         error:(response)=>{
//             console.log("error:");
//             console.log(response);
//         }
//     })
//   }
//   getCampaigns(){
//     let data;
//     let token = this.getCookie("token");
//     $.ajax({
//         type:"GET",
//         url: "http://localhost:8080/api/campaigns",
//         token:token,
//         headers:{user_id:this.getCookie("user_id")},
//         success:(response)=>{
//             console.log(response);
//             if(response.length>0){
//                 this.setState({recentCampaigns:response});
//                 this.setState({noCampaigns:false})
//             }else{
//                 this.setState({noCampaigns:true});
//             }
//         },
//         error:(response)=>{
//             console.log("error:");
//             console.log(response);
//         }
//     })
//   }
//   getCampaignEvents(){
//     let data;
//     let token = this.getCookie("token");
//     $.ajax({
//         type:"GET",
//         url: "http://localhost:8080/api/campaigns-events",
//         token:token,
//         headers:{user_id:this.getCookie("user_id")},
//         success:(response)=>{
//             console.log(response);
//             if(response.length>0){
//                 this.setState({campaignUpdates:response});
//                 this.setState({noCampaignUpdates:false});
//             }else{
//                 this.setState({noCampaignUpdates:true});
//             }
//         },
//         error:(response)=>{
//             console.log("error:");
//             console.log(response);
//         }
//     })
//   }
//   createNewCampaign(name){
//     let data ={
//         campaign_name:name,
//         admin_id:this.getCookie("user_id")
//     }
//     $.ajax({
//         type:"POST",
//         url: "http://localhost:8080/api/create-campaign",
//         data:JSON.stringify(data),
//         contentType: "application/json; charset=utf-8",
//         success:(response) =>{
//             console.log(response)
//             this.setState({newCampaignPopup:false})
//         },
//         error:(response)=>{
//             console.log("error:");
//             console.log(response);
//         }
//     }
//     )
//   }
//   openCampaign(id){

//   }
  getFollowingFeed(){

  }
  
  render(){
    return (
      <CampaignSelection></CampaignSelection>
    );
  }
}

export default BrandDash;
