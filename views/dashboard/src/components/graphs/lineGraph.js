import React, {Component} from "react";
import ReactDOM from "react-dom";
export default class LineGraph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:props.id+"graph",
            data:props.data,
            labels:props.labels,
            name:props.name,
            x:0,
            y:0,
            dayLines:[],
            selectedDayData:[]
        }
    }
    mouseClick(e){
        let canvas = ReactDOM.findDOMNode(this.refs.canvas);
        var rect = canvas.getBoundingClientRect();
        var mousePos ={
            x:e.clientX-rect.left,
            y:e.clientY-rect.top
        }
        console.log(mousePos);
        let x =[];
        this.state.dayLines.map((day,i)=>{
            if(mousePos.x > day.location-15 && mousePos.x < day.location+15 ){
                this.state.data.map((user,index)=>{
                    console.log(user[i+1]);
                    x.push(user[i+1]);
                })
            }
        })
        this.setState({selectedDayData:x});
    }

    _onMouseMove(e) {
        let canvas = ReactDOM.findDOMNode(this.refs.canvas);
        let ctx = canvas.getContext('2d');
        var rect = canvas.getBoundingClientRect();
        var mousePos ={x:e.clientX-rect.left,
                        y:e.clientY-rect.top}

        ctx.clearRect(0,0,900,500)    
        ctx.strokeStyle = 'rgb(0,0,0)';

        for(let i=0;i<this.state.dayLines.length;i++){

            if(mousePos.x >= this.state.dayLines[i].location-15 && mousePos.x < this.state.dayLines[i].location+15 ){
                ctx.lineWidth = 4;
            }else{
                ctx.lineWidth = 2;
            }
            ctx.beginPath();
            ctx.moveTo(this.state.dayLines[i].location,0);
            ctx.lineTo( this.state.dayLines[i].location,500);
            ctx.stroke();
        }


        ctx.strokeStyle = 'rgb(0,200,0)';
        ctx.lineWidth = 3;
       let max=0;
       this.state.data.map((user,index)=>{
           if(index==1){        ctx.strokeStyle = 'rgba(0,200,200,10)';
       }

           //finds the max value to scale the graph
           user.map((value,index2)=>{
               if(value>max){max=value}
 
           })
           user.map((value,index2)=>{
               ctx.beginPath();
               ctx.arc(index2*30,(Math.abs(canvas.height-value*(canvas.height/(max+50)))),5,0,2*Math.PI);
               ctx.fill();
           })

           ctx.beginPath();
           ctx.moveTo(0,canvas.height);
           user.map((value,index3)=>{

               ctx.lineTo(index3*30,(Math.abs(canvas.height-value*(canvas.height/(max+50)))))
               //console.log(index3*30+" "+(Math.abs(canvas.height-value*(canvas.height/(max+50)))))
           })
           ctx.stroke();
       })

        //must be seperate to layer correctly
        for(let i=0;i<this.state.dayLines.length;i++){
        if(mousePos.x >= this.state.dayLines[i].location-15 && mousePos.x < this.state.dayLines[i].location+15 ){
            ctx.font ="24px Arial";
            ctx.fillStyle= "rgb(255,255,255)";
            let flip;
            if(i<this.state.dayLines.length/2){
                flip = 0
            }else {
                 flip=300
            }
            ctx.fillRect(mousePos.x-flip,mousePos.y,300,100)
            ctx.fillStyle= "rgb(0,0,0)";
            this.state.data.map((user,index)=>{
            let x = (user[i+1]+" "+this.state.labels[index])
            ctx.fillText(x,mousePos.x-flip+20,mousePos.y+20+(index*20));
            })
        }
        
    }




        this.setState({ x: mousePos.x, y: mousePos.y });

      }

    componentDidMount(){
        console.log(this.state.data);
        let x = this.state.id;
        let canvas = ReactDOM.findDOMNode(this.refs.canvas);
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        canvas.width=900;
        canvas.height=500;

        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        var p = this.state.dayLines;
         for(let i=1;i<this.state.data[0].length;i++){
             ctx.beginPath();
             ctx.moveTo(i*30,canvas.height);
             ctx.lineTo(i*30,(0));
             ctx.stroke();
             p.push({location:i*30,active:false});
         }
         this.setState({dayLines:p});

         ctx.strokeStyle = 'rgb(0,200,0)';
         ctx.lineWidth = 3;
        let max=0;
        this.state.data.map((user,index)=>{
            if(index==1){        ctx.strokeStyle = 'rgb(0,200,200)';
        }

            //finds the max value to scale the graph
            user.map((value,index2)=>{
                if(value>max){max=value}
  
            })
            user.map((value,index2)=>{
                ctx.beginPath();
                ctx.arc(index2*30,(Math.abs(canvas.height-value*(canvas.height/(max+50)))),5,0,2*Math.PI);
                ctx.fill();
            })

            ctx.beginPath();
            ctx.moveTo(0,canvas.height);
            user.map((value,index3)=>{

                ctx.lineTo(index3*30,(Math.abs(canvas.height-value*(canvas.height/(max+50)))))
                //console.log(index3*30+" "+(Math.abs(canvas.height-value*(canvas.height/(max+50)))))
            })
            ctx.stroke();
        })

    }
    render(){
        return (
            <div>
                <h2>{this.state.name}</h2>
                <div className="graphContainer">
                    <canvas width="30" height="100" ref="canvas" 
                    onMouseMove={this._onMouseMove.bind(this)} 
                    onClick={(e)=>{this.mouseClick(e)}}/>
                    <div className="selectedDayDisplay">
                        {this.state.selectedDayData.map((user,index)=>{

                            return(
                                <div key={index}>
                                    <h3>{user}</h3>
                                    <h3>{this.state.labels[index]}</h3>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
          )
    }

}

