import Calender from './calender';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cal:new Calender()
        };
    }
    render(){
        return (
            "Hello LIKO"
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));
