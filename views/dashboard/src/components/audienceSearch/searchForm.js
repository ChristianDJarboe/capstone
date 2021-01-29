import React, {Component} from "react";

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.handleMetricChange = this.handleMetricChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state ={
      sliderValues:[
        {values:[33,66]},
        {values:[33,66]}
      ]
    }

  }
  componentDidMount(){
    let x = this.props.form.ratioDimensions.map((ratio,index)=>{
      let y=[];
      let z=[];
      ratio.labels.map((label,index2)=>{
        y.push(label)
      })
      ratio.values.map((value,index3)=>{
        z.push(value);
      })
      return(
        {
          values:z,
          labels:y
        }
      )
    })
    this.setState({silders:x});
    console.log(x);
  }
  handleMetricChange = e =>{
    var x = this.props.form.metrics
    x[e.target.name].value = e.target.value
    //this.setState({metrics:x});
    this.props.update("metric",this.props.index,e.target.name,null,e.target.value);
  }
  handleCheckboxChange = (e,dimensionIndex,valueIndex) =>{
    console.log(e.target.value);
    let x = this.state.sliderValues;
    x[dimensionIndex].values[valueIndex] = e.target.value
    this.setState({sliderValues:x});
    var newValues =[
      Math.abs( 0-x[dimensionIndex].values[0]),
      Math.abs( x[dimensionIndex].values[0]-x[dimensionIndex].values[1]),
      Math.abs( x[dimensionIndex].values[1]-100) ]
     console.log(newValues);
    
    this.props.update("range",this.props.index,dimensionIndex,newValues)
  }
  handleTextChange = e =>{
    var x = this.props.form.stringDimensions;
    x[e.target.name].value = e.target.value;
    this.props.update("text",this.props.index,e.target.name,null,e.target.value);
    //this.setState({stringDimensions:x});
  }

  render(){
    return (
     <div className="form">
        <h1>{this.props.form.platform}</h1>
        <div>
        <div className="metrics">
          <h2>Performance Metrics</h2>
          {
            this.props.form.metrics.map((metric,index)=>(
            <div className="metric">
              <label >{metric.name}</label>
              <input 
              type="number" 
              placeholder={metric.name} 
              name={index} 
              value={this.props.form.metrics[index].value} 
              onChange={e => this.handleMetricChange(e)}
              ></input>
            </div>

            ))
          }
        </div>
        <div className="rangeDimensions">
          <h2>Audience Demographic</h2>
          {
            this.props.form.ratioDimensions.map((dimension,index1)=>{

              return(
              <div className="rangeDimension">
                  <h1>{dimension.name}</h1>
                  <div className="doubleSlider">
                    <input className="slider" type="range" name="ageSlider1" value={this.state.sliderValues[index1].values[0]} onChange={(e)=>{this.handleCheckboxChange(e,index1,0)}}></input>
                    <input className="slider" type="range" name="ageSlider2"  value={this.state.sliderValues[index1].values[1]} onChange={(e)=>{this.handleCheckboxChange(e,index1,1)}}></input>
                  </div>
                  <div className="doubleSliderLabels">
                    {
                      dimension.labels.map((label,index2)=>{
                        return(
                        <div>{label}: {dimension.values[index2]}%</div>
                        )
                      })
                    }
                  </div>
              </div>
              )
            })
          }
        </div>
        </div>
        
        <div className="stringDimensions">
          <div>
            <h2>Creator Location</h2>
            <div>
              <label>{this.props.form.stringDimensions[0].name}</label>
              <input 
              name={0}
              type="text" 
              onChange={this.handleTextChange}
              value={this.props.form.stringDimensions[0].value}></input>
            </div>
            <div>
              <label>{this.props.form.stringDimensions[1].name}</label>
              <input 
              name={1} 
              type="text" 
              onChange={this.handleTextChange}
              value={this.props.form.stringDimensions[1].value}></input>
            </div>
          </div>
          <div>
            <h2>Content Tags</h2>
          <label>{this.props.form.stringDimensions[2].name}</label>
          <input 
              name={2}
              type="text" 
              onChange={this.handleTextChange}
              value={this.props.form.stringDimensions[2].value}></input>
          </div>

        <label>{this.props.form.stringDimensions[2].name}</label>

          {/* {
            this.props.form.stringDimensions.map((dimension,index)=>(
              <div>
              <label>{dimension.name}</label>
              <input 
              name={index} 
              type="text" 
              onChange={this.handleTextChange}
              value={dimension.value}></input>
              
              </div>

            ))
          } */}
        </div>
     </div>
    );
  }
}

export default SearchForm;
