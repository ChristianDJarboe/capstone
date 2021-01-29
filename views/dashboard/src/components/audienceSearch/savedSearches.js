import React, {Component} from "react";
export default class SavedSearches extends React.Component {
  constructor(props){
    super(props);
    this.state= {
        keywords:"",
        forms:[]
    }
}
  componentDidMount(){
    var x = this.state.forms;
    x = this.getSavedSearchs("userID","token")
  }
  getSavedSearchs(userID,token){
    //replace with ajax later
    var data = 
        [
            {
                name:"empty",
                keywords:"",
                forms:[
                    {
                        active:true,
                        platform:"youtube",
                        metrics:[
                        {
                          name:"views",
                          value:""
                        },
                        {
                          name:"subs",
                          value:""
                        },
                        {
                          name:"likes",
                          value:""
                        },
                        {
                          name:"shares",
                          value:""
                        },
                        {
                          name:"comments",
                          value:""
                        },
                        {
                          name:"linkClicks",
                          value:""
                        },
                      ],
                          ratioDimensions:[  
                            {  
                                name:"Age Groups",
                                labels:[
                                "youth","adults","senior"
                                ],
                                values:[
                                 false,false,false
                                ]
                            },
                            {
                                name:"Gender Identity",
                                labels:[
                                    "Male","Female","Non-Bianary"
                                    ],
                                    values:[
                                        false,false,false
                                       ]
                            }
                        ],
                        stringDimensions:[
                            {
                                name:"Country",
                                value:""
                            },
                            {
                                name:"City",
                                value:""
                            },
                            {
                                name:"tags",
                                value:""
                            }
                        ]
                        },
                        {
                            active:true,
                          platform:"instagram",
                          metrics:[
                            {
                              name:"page visits",
                              value:""
            
                            },
                            {
                              name:"followers",
                              value:""
            
                            },
                            {
                              name:"likes",
                              value:""
            
                            },
                            {
                              name:"shares",
                              value:""
            
                            },
                            {
                              name:"comments",
                              value:""
            
                            },
                            {
                              name:"linkClicks",
                              value:""
            
                            },
                          ],
                          ratioDimensions:[  
                            {  
                                name:"ageRatio",
                                labels:[
                                    "youth","adult","senior"
                                ],
                                values:[
                                    false,false,false
                                   ]
                            },
                            {
                                name:"genderRatio",
                                labels:[
                                    "male","female","non-bianary"
                                ],
                                values:[
                                    false,false,false
                                   ]
                            }
                        ],
                        stringDimensions:[
                            {
                                name:"Country",
                                value:""
                            },
                            {
                                name:"City",
                                values:""
                            },
                            {
                                name:"tags",
                                values:""
                            }
                        ]
                        }
                ]
            },
            {
                name:"ALL",
                keywords:"",
                forms:[
                    {
                        active:true,
                        platform:"youtube",
                        metrics:[
                        {
                          name:"views",
                          value:"6453453"
                        },
                        {
                          name:"subs",
                          value:"666666"
                        },
                        {
                          name:"likes",
                          value:"666666"
                        },
                        {
                          name:"shares",
                          value:"666666"
                        },
                        {
                          name:"comments",
                          value:"666666"
                        },
                        {
                          name:"linkClicks",
                          value:"666666"
                        },
                      ],
                          ratioDimensions:[  
                            {  
                                name:"Age Groups",
                                labels:[
                                "youth","adults","senior"
                                ],
                                values:[
                                 true,true,true
                                ]
                            },
                            {
                                name:"Gender Identity",
                                labels:[
                                    "Male","Female","Non-Bianary"
                                    ],
                                    values:[
                                        true,true,true
                                       ]
                            }
                        ],
                        stringDimensions:[
                            {
                                name:"Country",
                                value:""
                            },
                            {
                                name:"City",
                                value:""
                            },
                            {
                                name:"tags",
                                value:""
                            }
                        ]
                        },
                        {
                          active:true,
                          platform:"instagram",
                          metrics:[
                            {
                              name:"page visits",
                              value:""
            
                            },
                            {
                              name:"followers",
                              value:""
            
                            },
                            {
                              name:"likes",
                              value:""
            
                            },
                            {
                              name:"shares",
                              value:""
            
                            },
                            {
                              name:"comments",
                              value:""
            
                            },
                            {
                              name:"linkClicks",
                              value:""
            
                            },
                          ],
                          ratioDimensions:[  
                            {  
                                name:"ageRatio",
                                labels:[
                                    "youth","adult","senior"
                                ],
                                values:[
                                    false,false,false
                                   ]
                            },
                            {
                                name:"genderRatio",
                                labels:[
                                    "male","female","non-bianary"
                                ],
                                values:[
                                    false,false,false
                                   ]
                            }
                        ],
                        stringDimensions:[
                            {
                                name:"Country",
                                value:""
                            },
                            {
                                name:"City",
                                values:""
                            },
                            {
                                name:"tags",
                                values:""
                            }
                        ]
                        }
                ]
            }
           
          ]
    this.setState({forms:data});
  }
  render(){
    return (
       <div className="savedSearchesPopup">
          <h2>Saved Searches</h2>
          <div>
          {this.state.forms.map((result,index)=>(
                   <button onClick={()=>{
                       this.props.replace(this.state.forms[index])
                   }}>{result.name}</button>
           ))}
          </div>

       </div>
    );
  }
}

