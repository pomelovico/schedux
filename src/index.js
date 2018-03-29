import Calender from './calender';
import React from 'react';
import ReactDOM from 'react-dom';


import CalenderBox from './components/Calender';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cal:new Calender(),
            viewModel:'month' //month || week || date
        };
    }
    componentDidMount(){
    }
    render(){
        return (
            <CalenderBox 
            cal={this.state.cal}
            viewModel={this.state.viewModel}
            />
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));
