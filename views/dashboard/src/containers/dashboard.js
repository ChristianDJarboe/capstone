import BrandDash from "../containers/brandDash";
import  InfluencerDash from "../containers/influencerDash"
import React, {Component} from "react";
import $ from "jquery";
export default class dashContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            brandDashOpen:false,
            influencerDashOpen:false,
            fbPrompt:false
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
    componentDidMount(){
        let token =this.getCookie("token")
        $.ajax({
            type:"GET",
            url:  "/api/user",
            token:token,
            success:(response) =>{
                if(response[0].user_type =="brand"){
                    this.props.updateUser("brand")
                    this.setState({brandDashOpen:true})
                }
                if(response[0].user_type =="influencer"){
                    this.props.updateUser("influencer")
                    this.setState({influencerDashOpen:true})
                }
                console.log(response[0]);
            },
            error:(response)=>{
                alert("cound not find user data")
            }
        })
    }
    render(){
        return(
         

              <div>
                {this.state.brandDashOpen ?(
                    <BrandDash></BrandDash>
                ):null}
                 {this.state.influencerDashOpen ?(
                    <InfluencerDash></InfluencerDash>
                ):null}
              </div>
        
        );
    }
       
    
}