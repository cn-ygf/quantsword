import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

// 菜单组件
class UIMenuItem extends Component {

    subItemClick(event){
        console.log(this.props)
        this.props.subItemClick(event)
    }

    componentDidMount(){
        findDOMNode(this.refs.myself).addEventListener('click',(event)=>{
            this.subItemClick(event)
        },true)
    }

    render(){
        return (
            <li ref='myself'>
                <span>{this.props.children}</span>
                <span>{this.props.hotkey}</span>
            </li>
        )
    }
}
export default UIMenuItem;