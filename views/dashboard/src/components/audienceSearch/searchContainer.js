import React, {Component} from "react";
import SearchForm from "./creatorSearch/searchForm";
import SearchFormButton from "./searchFormButton";
import SavedSearches from "./creatorSearch/savedSearches";
import SelectedResults from "./selectedResults";
export default class SearchContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        optionsOpen:false,
        savedSearchesOpen:false,
        keywords:"",
        forms:[
            {
            active:false,
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
                     33,33,33
                    ]
                },
                {
                    name:"Gender Identity",
                    labels:[
                        "Male","Female","Non-Bianary"
                        ],
                        values:[
                            33,33,33
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
              active:false,
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
                        33,33,33
                    ]
                },
                {
                    name:"genderRatio",
                    labels:[
                        "male","female","non-bianary"
                    ],
                    values:[
                        33,33,33
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
          ],
        query:{
            platforms:[
                
            ],
            limit:10,
            keywords:""
        },
    }
    this.updateActive = this.updateActive.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.replace = this.replace.bind(this);

  }
  componentDidMount(){

  }
  search(){
      this.props.search(this.state.query)
  }
  /*subindex1 = metric/checkboxdimension/stringdimension 
    subindex2 = uhh like more nested values yup*/
  handleInput(type,formIndex,dimensionIndex,values){
      if(type=="metric"){
        var x = this.state.forms;
        this.setState({forms:x})
      }

      if(type=="range"){
        // console.log(type)
        // console.log(formIndex)
        // console.log(dimensionIndex)
        // console.log(values)
        let x = this.state.forms;
        x[formIndex].ratioDimensions[dimensionIndex].values = values;

        this.setState({forms:x})
        }
      if(type=="text"){
          var x = this.state.forms;
          this.setState({forms:x})
      }
  }
 
  updateActive(index,boolean){
    var x = this.state.forms;
    x[index].active=boolean;
    this.setState({forms: x})
    this.render();
  }
  submitSearch(){
    var x = this.state.forms;
    var b = this.state.query;
     x.map((form,index)=>{
         if(form.active==true){
            let y=[];
            form.metrics.map((metric,index)=>{
               let z;
                if(metric.value!=0){
                   z = {
                       name: metric.name,
                       value:metric.value
                   }
                   y.push(z);
                }
            })
            let d=[]
            form.ratioDimensions.map((dimension,index)=>{
                let z=[];
                dimension.values.map((value,index)=>{
                    if(value==true){
                        z.push(dimension.labels[index])
                    }
                })
                d.push(
                    {
                        name:dimension.name,
                        selected:z
                    }
                )
            })
            let k=[]
            form.stringDimensions.map((dimension,index)=>{
                let z;
                if(dimension.value !=""){
                    z={
                        name:dimension.name,
                        value:dimension.value
                    }
                }
                k.push(z);
            })
            b.platforms.push({
                name:form.platform,
                metrics:y,
                checkboxDimensions:d,
                stringDimensions:k
            })
         }  
     })
     b.keywords=this.state.keywords;
     this.state.query = b;
     this.props.search(this.state.query);
     this.setState({keywords:""})
  }
  replace(form){
    this.setState({forms:form.forms});
    this.setState({keywords:form.keywords});
    this.setState({savedSearchesOpen:false});
    this.setState({optionsOpen:true});
  }
  render(){
    return (
            <div id="searchBar">
                <form onSubmit={(e)=>{e.preventDefault(); this.submitSearch()}}>
                {this.state.savedSearchesOpen ?
                    <button onClick={()=>{this.setState({savedSearchesOpen:false})}}>Saved</button>
                    :
                    <button onClick={()=>{this.setState({savedSearchesOpen:true})}}>Saved</button>
                }
                {this.state.optionsOpen ?
                    <button onClick={()=>{this.setState({optionsOpen:false})}}>Options</button>
                    :
                    <button onClick={()=>{this.setState({optionsOpen:true})}}>Options</button>
                }
                <input
                    id="searchBarField" 
                    type="search"
                    value={this.state.keywords}
                    onChange={(e)=>{this.setState({keywords:e.target.value})}}
                    ></input>
                <input id="submitSearchButton" type="submit"></input>
                </form>
                
                <div id="popupContainer">
                    {this.state.optionsOpen ?
                    (
                        <div id="searchOptions">
                            <h2>Select Platforms</h2>
                            <div className="platformSelection">
                            {
                                this.state.forms.map((form,index)=>(
                                    <SearchFormButton 
                                        update={this.updateActive} 
                                        platformName={form.platform}
                                        active={false}
                                        key={index}
                                        index={index}
                                    ></SearchFormButton>
                        
                                ))
                            }
                            </div>
                            <div className="forms">
                            {
                                this.state.forms.map((form,index)=>(
                                    form.active ?
                                    <SearchForm 
                                        form={form} 
                                        index={index}
                                        key={index}
                                        active={this.state.forms[index].active}
                                        update={this.handleInput}
                                    ></SearchForm>
                                    :
                                    null
                                ))
                            }
                            </div>
                        </div>
                    ):(
                        null
                    )
                    }
                    {this.state.savedSearchesOpen ?
                    (
                        <SavedSearches replace ={this.replace}></SavedSearches>
                    ):(
                        null
                    )
                    }
                    
                </div>
            </div>
        
       
    );
  }
}

