import React from 'react';

import DayItem from './dayItem';
export default class CalenderBox extends React.Component{
    constructor(props){
        super(props);
    }
    build(){
        let {cal,viewModel} = this.props;
        const month = cal.genMonth();
        
        return month.map((d,key)=>{
            return <DayItem key={key} day={d}/>
        })
    }
    render(){
        return (<div>
            {this.build()}
        </div>)
    }
}