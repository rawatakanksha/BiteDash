import React from "react";
import User from "./User";
import UserContext from "../utils/UserContext";

class About extends React.Component{
    constructor(props){
        super(props);

        this.state={
            count:0
        }
        console.log("parent constructor lifecycle")
    }

    componentDidMont(){
         console.log( "parent componentDidMount lifecycle")
    }

    componentDidUpdate(){
         console.log( "parent componentDidupdate lifecycle")
    }
    componentWillUnmount(){
         console.log( "parent componenunmont lifecycle")
    }

    render(){
          console.log("parent render lifecycle")
        return(
            <div>     
                   <div>LoggedIn User:
                    <UserContext.Consumer>
                    {({loggedInUser})=> loggedInUser}
                    </UserContext.Consumer></div>      
                <User name={"akanksha"} age={24} child={"A"}/>
            </div>
        )
    }
}

export default About