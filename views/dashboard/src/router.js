//COMPONENTS
import Dashboard from "./containers/lmaonestedcontainers";
import AudienceSearch from "./containers/audienceSearch"
import Campaign from "./components/campaignManager/campaign";

//INFLUENCER SPECIFIC
import CollabSearch from "./components/collabSearch"
import AdvertSearch from "./components/advertSearch"
import MyContracts from "./components/myContracts"
import InfluencerAccount from "./containers/iAccount"



import React from 'react'
import { Switch, Route } from 'react-router'
// Write component imports here //
export default function Router (){


    return(
        <Switch>
            {/*Universal paths */}
            <Route exact path="/dashboard">
                <Dashboard ></Dashboard>
            </Route>


            {/* Influencer paths */}
            <Route path="/collabSearch"> 
                <CollabSearch></CollabSearch>
            </Route>
            <Route path="/advertSearch"> 
                <AdvertSearch></AdvertSearch>
            </Route>
            <Route path="/myContracts"> 
                <MyContracts></MyContracts>
            </Route>
            <Route path="/influencerAccount"> 
                <InfluencerAccount></InfluencerAccount>
            </Route>

            {/* Brand paths */}
            <Route path="/dashboard/campaign/:id"> 
                <Campaign></Campaign>
            </Route>
            <Route path="/dashboard/audiencesearch"> 
                <AudienceSearch></AudienceSearch>
            </Route>
        </Switch>
    )
}

