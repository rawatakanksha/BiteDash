import React from "react";
import User from "./User";

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
                <User name={"akanksha"} age={24} child={"A"}/>
                <User name={"HARSH"} age={24} child={"B"}/>
                <User name={"aka"} age={24} child={"C"}/>

            </div>
        )
    }
}

export default About