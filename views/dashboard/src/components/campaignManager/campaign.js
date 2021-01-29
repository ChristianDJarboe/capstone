import React, {Component} from "react";
import { useParams } from 'react-router';
import CampaignManager from "./campaignManager";
const Campaign = (props)=>{
  let params = useParams();
  console.log(params);
  
  return(
    <div>
      <CampaignManager data={params}></CampaignManager>
    </div>
  )
}

export default Campaign;
