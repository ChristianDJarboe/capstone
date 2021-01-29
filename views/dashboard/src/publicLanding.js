import React, {Component} from "react";
import $ from "jquery";

class Public extends React.Component {
  constructor(props){
    super(props);
    this.state={
        blurbIndex:0,
        blurb:[
            "Influencers",
            "Content Creators",
            "Marketing Teams",
            "Journalists",
            "Everyone"
        ],
        signupOpen:true,
        loginOpen:true,
        email:"",
        pw:"",
        type:"",
        accName:"",

        loginEmail:"",
        loginPw:"",
        loginAttempts:0
    }
  }
  componentDidMount() {
    // this.timerID = setInterval(
    //   () => this.tick(),
    //   3000
    // );
  }
//   tick() {
//       if(this.state.blurbIndex>=this.state.blurb.length-1){
//           this.setState({blurbIndex:0})
//       }else{
//         this.setState({
//             blurbIndex: this.state.blurbIndex + 1
//           });
//       }

//   }
  signUp(){
    let data ={
        email:this.state.email,
        password:this.state.pw,
        account_name:this.state.accName,
        user_type:this.state.type
     
    }
    if(data.email !="" && data.password!="" && data.user_type!="" && data.account_name!=""){
        console.log(data);

    }else{
        alert("Gotta fill out all the fields b")
    }
    $.ajax({
        type:"POST",
        url: "http://localhost:8080/auth/signup",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:(response) =>{
            console.log(response)
            
        },
        error:(response)=>{
            console.log("error:");
            console.log(response);
        }
    }
    )
  }
  login(){
    if(this.state.loginEmail!="" && this.state.loginPw!=""){
        this.props.login(this.state.loginEmail,this.state.loginPw);

    }else{
        alert("fill in fields pls ty")
    }
  }

  render(){
    return (
      <div>
          <header>
                <div id="headerNav">
                    {/*Put nav buttons here */}
                </div>
                <button>Login/Signup</button>
          </header>
          <div id="popupContainer">
            {this.state.signupOpen ?
            (
                <div>
                    <div>
                        <h1>We'd love to have you!</h1>
                        <h2>Sign up!</h2>
                    </div>
                    <div>
                        <form>
                            <label htmlFor="email">Email</label>
                            <input name="email" type="email" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}></input>
                            <label htmlFor="pw">Password</label>
                            <input name="pw" type="password" value={this.state.pw} onChange={(e)=>{this.setState({pw:e.target.value})}}></input>
                            <label htmlFor="accName">Account Name</label>
                            <input name="accName" type="text" value={this.state.accName} onChange={(e)=>{this.setState({accName:e.target.value})}}></input>
                            <h2>I am a:</h2>
                            <select onChange={(e)=>{this.setState({type:e.target.value})}}>
                                <option selected disabled hidden >Select user type</option>
                                <option name="influencer" value="influencer">Influencer/Content creator</option>
                                <option name="marketer" value="marketer">Contracted Marketing team</option>
                                <option name="brand" value="brand">Brand Marketing team</option>
                            </select>
                        </form>
                        <button onClick={()=>{this.signUp()}}>Sign Up!</button>
                    </div>
                </div>
            ):(null)}
                   {this.state.loginOpen ?
            (
                <div>
                    <h1>Welcome Back!</h1>
                    <h2>Login</h2>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" value={this.state.loginEmail} onChange={(e)=>{this.setState({loginEmail:e.target.value})}}></input>
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" value={this.state.loginPw} onChange={(e)=>{this.setState({loginPw:e.target.value})}}></input>
                    </form>
                    <button onClick={()=>{this.login()}}>Login</button>
                    <button>No Account? Sign up!</button>
                </div>
            ):(null)}
          </div>
          <div className="pageSection" id="titleCard">
              <div>
                <h1>Company Name</h1>
                <h2>Bringing brands and audiences together</h2>
              </div>
            <h2>Something for everyone. {this.state.blurb[this.state.blurbIndex]}</h2>
          </div>
          <div className="pageSection" >

          </div>
      </div>
    );
  }
}

export default Public;
