import React from 'react';

export default class Day extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div>
            {this.props.day.date.join('-')}
        </div>)
    }
}