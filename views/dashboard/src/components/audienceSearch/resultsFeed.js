import React, {Component} from "react";
import SearchResult from "./creatorSearch/searchResult";
export default class ResultsFeed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       results:props.data

  }
  console.log("results feed init")
  this.addtolist = this.addtolist.bind(this);
}
 componentDidMount(){

  }
  addtolist(id){
    this.props.addresult(id);
  }

  render(){
    return (
       <div id="resultsFeed">
           {this.props.data.map((result,index)=>(
               <SearchResult data={result} key={index} add ={this.addtolist}></SearchResult>
           ))}
       </div>
    );
  }
}

