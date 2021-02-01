import '../App.css';
import react, {Component} from "react"
import $ from "jquery"
import LoginPrompt from "./login"
import SignupPrompt from "./signup"

class Landing extends react.Component {
    constructor(props){
        super(props)
        this.state={
            portalURL:"https://1c353115f1c0.ngrok.io",

            public:false,
            influencerCard:false,
            brandCard:true,
            email:"",
            password:"",

            newEmail:"",
            newPassword:"",
            newPasswordRepeat:"",
            newUserType:""
        }
        this.swap = this.swap.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this);
    }
    swap(input){
        if(input ==1){
            this.setState({influencerCard:false})
            this.setState({brandCard:true})
            $("#brandButton").addClass("active")
            $("#influencerButton").removeClass("active")

        }else{
            this.setState({influencerCard:true})
            this.setState({brandCard:false})
            $("#influencerButton").addClass("active")
            $("#brandButton").removeClass("active")
        }
    }
    handleInput(e){
        console.log(e.target.name+" "+e.target.value)
        this.setState({[e.target.name]:e.target.value})
    }
    FBlogin(){
        console.log("Login");
        window.FB.login(function(response){
            console.log(response)


          },{scope:'instagram_basic,pages_show_list'});
    }
    login(){
        
        console.log("login")
        var data = {
            email: this.state.email, 
            password: this.state.password}
        $.ajax({
            type:"POST",
            url: this.state.portalURL+"/auth/login",
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
    
            success:(response) =>{
                console.log(response);
                console.log("Login Successful")
                this.setCookies(response.token, response.user_id);
                window.location.href = this.state.portalURL+"/dashboard";
              },
            error:(response)=>{
                  console.log("error:");
                  console.log(response);
                  alert("Login Rejected")
            }
        }
        )
      }
      logout(p){
        console.log("logout");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.setState({public:true});
      }
    
      setCookies(token,user_id) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = "token" + '=' + token + ';expires=' + expires.toUTCString();
        document.cookie = "user_id" + '=' + user_id + ';expires=' + expires.toUTCString();
      }
    signUp(){
        let data ={
            email:this.state.newEmail,
            password:this.state.newPassword,
            passwordRepeat:this.state.newPasswordRepeat,
            user_type:this.state.newUserType
        }
        if(data.password === data.passwordRepeat){
            $.ajax({
                type:"POST",
                url: this.state.portalURL+"/auth/signup",
                data:JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success:(response) =>{
                    console.log(response)
                    this.setState({email:data.email})
                    this.setState({password:data.password})
                    this.login()
                },
                error:(response)=>{
                    console.log("error:");
                    console.log(response);
                }
            }
            )
        }else{
            alert("somthing wrong cuh")
        }
     
    }
    linkInstagram(){
        
    }
    componentDidMount(){
    }

    render(){
        return (
            <div className="App">
                <div id="fb-root"></div>
                {this.state.public ?
                (
                    <div>Your logged in nig nog</div>
                ):(<div>Not logged in</div>)}
                <div  className="pageSection">
                    <div id="titleCard">
                        <div>
                            <h2>{this.props.user_type}</h2>
                            <h1>Tabula</h1>
                            <h2>A social media marketing campaign manager</h2>
                        </div>
                        <div id="loginContainer">
                            <LoginPrompt login={this.login} handleInput={this.handleInput}></LoginPrompt>
                            <SignupPrompt signUp={this.signUp} handleInput={this.handleInput}></SignupPrompt>
                        </div>
                    </div>
      
                    <div id="swapCardContainer">
                        <div>
                            <button className="active" onClick={()=>{this.swap(1)}} id="brandButton">For Brands</button>
                            <button onClick={()=>{this.swap(2)}} id="influencerButton">For Influencers</button>
                        </div>
                        {this.state.influencerCard ?
                        (
                        <div id="influencerCard" className="swapCard">
                            <h2>Get paid for your audience</h2>
                            <div className="hor-surface">
                                <div className="hor-surface-card">
                                    <h3>Apply for open advertisments</h3>
                                    <div>
                                        <p>Our Brand users can post open advertisments that you can search and apply for</p>
                                    </div>
                                </div>
                                <div className="hor-surface-card">
                                    <h3>Have brands approach you with offers</h3>
                                    <div>
                                        <p>Our Brand users will approuch our influencers with offers based on audience and content</p>
                                    </div>
                                </div>
                                <div className="hor-surface-card">
                                    <h3>See what others are paid for their audience</h3>
                                    <div>
                                        <p>Payment transparency helps our influencers feel more confident that they are paid fairly for their services</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ):(null)}
                         {this.state.brandCard ?
                        (
                        <div id="brandCard" className="swapCard">
                            <h2>Manage your online marketing campaigns</h2>
                            <div className="hor-surface">
                                <div className="hor-surface-card">
                                    <h3>Curate brand representatives</h3>
                                    <div>
                                        <p>Find the perfect inflencers/audiences to show you're products</p>
                                    </div>
                                </div>
                                <div className="hor-surface-card">
                                    <h3>Let anyone advertise for you</h3>
                                    <div>
                                        <p>Utilize micro-influencers by posting and open advertisment anyone can accept</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ):(null)}
                    </div>
                </div>
            </div>
          );
    }

}

export default Landing;
