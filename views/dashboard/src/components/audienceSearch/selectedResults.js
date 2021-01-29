import React, {Component} from "react";
export default class SelectedResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data:props.data,
        saveAsOpen:false,
        newSaveName:""
    }
}
  componentDidMount(){

  }
  saveSearch(savedUsers){
    //replace with ajax later
    console.log(savedUsers)
    this.setState({saveAsOpen:false});
    this.setState({newSaveName:''});
  }

  render(){
    return (
       <div id="selectedResults">
          <div>
            <div>
                <button onClick={()=>{this.setState({saveAsOpen:true});}}>SaveAS</button>
                <button onClick={()=>{this.props.removeAll()}}>RemoveAll</button>
                  <button >Compare</button>
            </div>
            {this.props.data.map((selectedUser,index)=>(
                <div key={index}>
                    <h3>{selectedUser.handle}</h3>
                    <button onClick={()=>{this.props.remove(selectedUser.userID)}}>X</button>
                </div>
            ))}
          </div>
          {this.state.saveAsOpen ?
          (
            <div id="saveAsPopup">
              <form onSubmit={(e)=>{e.preventDefault(); this.saveSearch(this.state.data)}}>
                <input 
                type="text" 
                placeholder="new save name" 
                value={this.state.newSaveName} 
                onChange={(e)=>{this.setState({newSaveName:e.target.value})}}></input>
              </form>
            </div>
          ):(
            null
          )}
       </div>
    );
  }
}

