import React, {Component} from "react";

export default class SearchFormButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        name: props.platformName,
        active: props.active,
        index:  props.index
    }
  }
  componentDidMount(){

  }
  active(index,boolean){
      this.props.update(index,boolean)
  }
  render(){
    return (
    this.state.active ?
    (
        <button
        style={{backgroundColor: "red"}}
        key ={this.state.index}
        onClick={()=>{
            this.setState({active:false})
            this.active(this.state.index,false)
        }}>
            {this.state.name}
        </button>
    )
    :
    (
        <button
        key ={this.state.index}
        onClick={()=>{
            this.setState({active:true})
            this.active(this.state.index,true)

        }}>
            {this.state.name}
        </button>
    )
    );
  }
}


