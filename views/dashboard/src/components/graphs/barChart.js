import React, {Component, createContext} from "react";
import ReactDOM from "react-dom";
export default class BarChart extends React.Component{
    constructor(props){
        super(props);
        this.state={
          barLabels: props.dimensionLabels,
          userValues : props.usersValues,
          userLabels : props.labels,
          name : props.name,
          colors: ["rgb(200,0,0)","rgb(0,200,0)","rgb(200,0,200)"],
          x:"",
          y:"",
          barPositions:[

          ],
          usernamePositions:[

          ],
          selected:{
            name:"",
            keys:[],
            values:[]
          },

        }
        
    }
    collision(mousePos,object){

    }

    _onMouseMove(e) {
      let canvas = ReactDOM.findDOMNode(this.refs.canvas);
      let ctx = canvas.getContext('2d');
      let x = this.state;
      var rect = canvas.getBoundingClientRect();
      var mousePos ={x:e.clientX-rect.left,
                      y:e.clientY-rect.top}
      canvas.width=900;
      canvas.height=500;
      ctx.clearRect(0,0,canvas.width,canvas.height);

      ctx.fillStyle='rgb(0,0,0)'
      ctx.strokeStyle = 'rgb(0,0,0)';
      ctx.lineWidth = 2;
      ctx.font ="24px Arial";
      ctx.fillText("100",0,20);
      ctx.fillText("50",0,(canvas.height/2)-10);
      ctx.fillText("0",0,canvas.height-40);
      // this.setState({usernamePositions:[]})
      let temp = [];
      x.userLabels.map((label,index)=>{
        var columnPosition={
          pointer:"",
          x1:"",
          y1:"",
          x2:"",
          y2:""
        }
        var textPosition={
          x1:"",
          y1:"",
          x2:"",
          y2:""
        }
        textPosition.x1 = 100+200*index;
        textPosition.y1 = canvas.height-20
        textPosition.x2 =  (100+200*index)+150 
        textPosition.y2 =  canvas.height-50
        //FOR USER SELECTION
        if(mousePos.x > textPosition.x1 &&
          mousePos.x < textPosition.x2 &&
          mousePos.y < textPosition.y1 &&
          mousePos.y > textPosition.y2 ){
            ctx.fillStyle="rgb(100,100,100)"
          }else{
            ctx.fillStyle="rgb(0,0,0)"
          }
        temp.push(textPosition)
        ctx.fillRect(textPosition.x1,textPosition.y1+15,150,-40)
        //Reduce string
        let poopoopeepee = label.substring(0,12);
        ctx.fillStyle='rgb(255,255,255)'
        ctx.fillText(poopoopeepee,100+200*index,canvas.height-20);
  

        x.userValues[index].map((value,index2)=>{
          columnPosition.x1=100+(index*200)+(index2*50);
          columnPosition.y1=450;
          columnPosition.x2=40;
          columnPosition.y2=-value*3.5;
          // ppp.push(columnPosition)
          // console.log(columnPosition);
          // console.log(ppp);
          if(mousePos.x > columnPosition.x1 &&
             mousePos.x < columnPosition.x2+columnPosition.x1 &&
             mousePos.y < columnPosition.y1 &&
             mousePos.y > columnPosition.y2+columnPosition.y1
             ){
            ctx.fillStyle="rgb(0,0,0)"
          }else{
            ctx.fillStyle=x.colors[index2]
          }
          ctx.fillRect(columnPosition.x1, columnPosition.y1,columnPosition.x2,columnPosition.y2)
        })
        //  temp3.push(temp2)
      })
      this.setState({ x: mousePos.x, y: mousePos.y });
    }
    mouseClick(e){
      let canvas = ReactDOM.findDOMNode(this.refs.canvas);
      var rect = canvas.getBoundingClientRect();
      var mousePos ={
        x:e.clientX-rect.left,
        y:e.clientY-rect.top
    }
    // console.log(mousePos)
    this.state.barPositions.map((position,index)=>{
      
      if(mousePos.x > position.x1 &&
        mousePos.x < position.x2+position.x1 &&
        mousePos.y < position.y1 &&
        mousePos.y > position.y2+position.y1
        ){
          let x = this.state.selected;
          x.keys= this.state.userLabels;
          x.name= this.state.barLabels[position.position];
          
          let y = []
          this.state.userValues.map((user,index2)=>{
            y.push(user[position.position])
          })
          x.values=y;
        

          
          console.log(x);
        }else{
        }
    })

      this.state.usernamePositions.map((position,index)=>{
        if(mousePos.x > position.x1 &&
          mousePos.x < position.x2 &&
          mousePos.y < position.y1 &&
          mousePos.y > position.y2 ){

            console.log("hit");
            let x = this.state.selected;
            x.name=this.state.userLabels[index];
            x.keys = this.state.barLabels
            x.values = this.state.userValues[index]
            console.log(x);
            this.setState({selected:x});
          }else{
          }
      })
    }

    componentDidMount(){
      let canvas = ReactDOM.findDOMNode(this.refs.canvas);
      let ctx = canvas.getContext('2d');
      let x = this.state;
      ctx.strokeStyle = 'rgb(0,0,0)';
      ctx.lineWidth = 2;
      canvas.width=900;
      canvas.height=500;
      ctx.font ="24px Arial";
      ctx.fillText("100",0,20);
      ctx.fillText("50",0,(canvas.height/2)-10);
      ctx.fillText("0",0,canvas.height-40);

      // x.userLabels.map((label,index)=>{
      //   ctx.fillStyle='rgb(0,0,0)'

      //   ctx.fillText(label,100+200*index,canvas.height-20);
      //   x.userValues[index].map((value,index2)=>{
      //     // ctx.fillText(value,100*index2,100);
      //     ctx.fillStyle=x.colors[index2]
      //     ctx.fillRect(100+(index*200)+(index2*50), 450,(index)+40,-value*3.5)
      //   })
      // })
      let temp = [];
      let temp2=[];
      x.userLabels.map((label,index)=>{
        var textPosition={
          x1:"",
          y1:"",
          x2:"",
          y2:""
        }
        
        textPosition.x1 = 100+200*index;
        textPosition.y1 = canvas.height-20
        textPosition.x2 =  (100+200*index)+150 
        textPosition.y2 =  canvas.height-50
        //FOR USER SELECTION
        temp.push(textPosition)
        ctx.fillStyle='rgb(0,0,0)'
        ctx.fillRect(textPosition.x1,textPosition.y1+15,150,-40)
        //Reduce string
        let poopoopeepee = label.substring(0,12);
        ctx.fillStyle='rgb(255,255,255)'
        ctx.fillText(poopoopeepee,100+200*index,canvas.height-20);
      })
      for(let i=0;i<x.userValues.length;i++){

        x.userValues[i].map((value,index2)=>{
          
          var columnPosition={
            position:index2,
            x1:"",
            y1:"",
            x2:"",
            y2:""
          }
          columnPosition.x1=100+(i*200)+(index2*50);
          columnPosition.y1=450;
          columnPosition.x2=40;
          columnPosition.y2=-value*3.5;
          //console.log(columnPosition);
          temp2.push(columnPosition);
          ctx.fillStyle=x.colors[index2]
          ctx.fillRect(columnPosition.x1, columnPosition.y1,columnPosition.x2,columnPosition.y2)
        })
      }
      this.setState({barPositions:temp2});
      this.setState({usernamePositions:temp});

    }
    render(){
        return (
          <div>
          <h2>{this.state.name}</h2>
          <div className="graphContainer">
              <canvas width="30" height="100" ref="canvas" 
              onMouseMove={this._onMouseMove.bind(this)} 
              onClick={(e)=>{this.mouseClick(e)}}/>
              <div className="selectedDisplay">
                 {this.state.selected.name}
                 {this.state.selected.keys.map((key,index)=>{
                   return(
                   <div>{key} {this.state.selected.values[index]}</div>
                   )
                 })}
              </div>
          </div>
      </div>
          )
    }

}

