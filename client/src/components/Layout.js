import React from "react";

export default class Layout extends React.Component{
    constructor () {
        super();
        this.name = "Kwaz";
    }

    render() {
        return (
            <h1> It's {this.name}! He's super hott!!!!!</h1>
        );
    };

    
}