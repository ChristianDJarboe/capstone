import React, {Component} from "react";
import LineGraph from "./graphs/lineGraph";
import BarChart from "./graphs/barChart";
export default class ComparisonTools extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        usersIDs:props.data,
        usersData:[],
        complete:false,
        differenceSince:7,
        selectedMetrics:[],
        selectedDimensions:[]

    }
}
  componentDidMount(){

    // console.log(this.state)
  }

  
  render(){
    return (
       <div id="comparisonTools">
           <div id="comparisonToolOptions">
               <form>
                   <label>gain/loss Since</label>
                   <select value={this.state.differenceSince} onChange={(e)=>{this.setState({differenceSince:e.target.value})}}>
                       <option value="1" >Yesterday</option>v
                       <option value="7">Last Week</option>
                       <option value="29">Last Month</option>

                   </select>
               </form>
           </div>
           <div id="metricsTable">
                {this.state.usersData.map((user,index)=>{
                    if(index==0){
                        return(
                            <div>
                                <div className="metricsTableRow">
                                    <h1>Metrics</h1>
                                    <div>
                                    {user.metrics30Day[0].data.map((metric,index)=>(
                                        <h4>{metric.name}</h4>
                                    ))}
                                    </div>
                                </div>
                                <div className="metricsTableRow">
                                    <h1>{user.handle}</h1>
                                    <div>
                                    {user.metrics30Day[29].data.map((metric,index)=>{
                                        let x = user.metrics30Day[29-this.state.differenceSince].data
                                        let y= x[index].value;
                                        let z = (metric.value-y);
                                        if(z<0){
                                            return(
                                                <h4 className="depreciatedMetric">{metric.value} -({Math.abs(z)})</h4>
                                            )
                                        }else if(z>0){
                                            return(
                                                <h4 className="appreciatedMetric">{metric.value} +({Math.abs(z)})</h4>
                                            )
                                        }else{
                                            return(
                                                <h4 className="appreciatedMetric">{metric.value}
                                                </h4>
                                            )
                                        }
             
                                    }
                                    )}
                                    </div>
                                </div>
                            </div>

                        )
                    }
                    return(
                        <div className="metricsTableRow">
                        <h1>{user.handle}</h1>
                        <div>
                        {user.metrics30Day[29].data.map((metric,index)=>{
                            let x = user.metrics30Day[this.state.differenceSince].data
                            let y= x[index].value;
                            let z = (metric.value-y);
                            if(z<0){
                                return(
                                    <h4 className="depreciatedMetric">{metric.value} -({Math.abs(z)})</h4>
                                )
                            }else if(z>0){
                                return(
                                    <h4 className="appreciatedMetric">{metric.value} +({Math.abs(z)})</h4>
                                )
                            }else{
                                return(
                                    <h4 className="appreciatedMetric">{metric.value}
                                    </h4>
                                )
                            }
 
                        }
                        )}
                        </div>
                    </div>
                    )
                }
                )}
           </div>
           <div id="metricsSelection">
               <h3>Metrics</h3>
                {this.state.selectedMetrics.map((metric,index)=>(
                    metric.active ?
                    (
                        <button onClick={()=>{
                            let x= this.state.selectedMetrics;
                            x[index].active = false
                            this.setState({selectedMetrics:x})
                        }}>{metric.name}</button>
                    ):(
                        <button onClick={()=>{
                            let x= this.state.selectedMetrics;
                            x[index].active = true
                            this.setState({selectedMetrics:x})
                        }}>{metric.name}</button>
                    )

                ))}
           </div>
           <div id="dimensionSelection">
               <h3>Dimensions</h3>
               {this.state.selectedDimensions.map((dimension,index)=>(
                   dimension.active ?
                   (
                    <button onClick={()=>{
                        let x= this.state.selectedDimensions;
                        x[index].active = false
                        this.setState({selectedDimensions:x})
                    }}>{dimension.name}</button>
                ):(
                    <button onClick={()=>{
                        let x= this.state.selectedDimensions;
                        x[index].active = true
                        this.setState({selectedDimensions:x})
                    }}>{dimension.name}</button>
                )
               ))}
           </div>
           <div id="graphsContainer">
               {this.state.selectedMetrics.map((metric,index1)=>{
                   let labels=[]
                   let x=[]; //users array
                   {this.state.usersData.map((user,index2)=>{
                       labels.push(user.handle)
                       let y=[]//30 day metric values
                        user.metrics30Day.map((day,index3)=>{
                            day.data.map((metricValues,index4)=>{
                                if(metricValues.name==metric.name){
                                y.push(metricValues.value)  //push value to y
                                }
                            })
                        })
                        x.push(y);  //push list of values to x
                   })}
                   return(
                       metric.active ?
                       (
                        <LineGraph key={index1} id={index1} data={x} name={metric.name} labels={labels}></LineGraph>
                       ):(null)
                   )
                })}
           </div>
           <div id="dimensionGraphsContainer">
               {this.state.selectedDimensions.map((dimension,index1)=>{
                   let labels=[]
                   let x=[]; //users array
                   let dimensionLabels=[]
                   {this.state.usersData.map((user,index2)=>{
                       labels.push(user.handle)
                       let y=[]//dimensionvalues
                        user.ratioDimensions.map((ratio,index3)=>{
                            ratio.values.map((ratioValue,index4)=>{
                                if(ratio.name==dimension.name){
                                y.push(ratioValue)  //push value to y
                                }
                            })
                            ratio.labels.map((ratioLabel,i4)=>{
                                if(ratio.name==dimension.name && index2 <1){
                                    dimensionLabels.push(ratioLabel);
                                }
                            })
                        })
                        x.push(y);  //push list of values to x
                   })}
                //    console.log(x);
                   return(
                       dimension.active ?
                       (
                        <BarChart key={index1} usersValues={x} labels={labels} name={dimension.name} dimensionLabels={dimensionLabels}></BarChart>
                       ):(null)
                   )
               })}
           </div>
       </div>
    );
  }
}

