import React, {Component} from "react";
export default class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = props.data;
  console.log("results feed init")
}
  componentDidMount(){

  }


  render(){
    return (
       <div className="result">
            <button onClick={()=>{this.props.add({
                handle:this.state.handle,
                userID:this.state.userID
            })}}>Add</button>
            <h1>Result</h1>
                <h1>{this.state.handle}</h1>
                <h2>{this.state.name.first} {this.state.name.last}</h2>
                <div className="resultMetrics">
                {this.state.metrics.map((metric,index)=>(
                        <h3 key={index}>{metric.name} : {metric.value}</h3>
                ))}
                </div>
                <div className="resultRatioDimensions">
                {this.state.ratioDimensions.map((dimension,index)=>(
                    <div key={index}>
                        {dimension.name}
                        <div>
                            {dimension.values.map((value,index)=>(
                                <div key={index}>{dimension.labels[index]} %{value}</div>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
                <div className="resultStringDimensions">
                    {this.state.stringDimensions.map((dimension,index)=>(
                        <h3 key={index}>{dimension.name} : {dimension.value}</h3>
                    ))}
                </div>
       </div>
    );
  }
}

