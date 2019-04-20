import React, { Component } from 'react';
import './Menu.css';

// 菜单组件
class UIMenu extends Component {

    render(){
        return (
            <div className="MenuButton" onClick={this.props.itemClick} onMouseOver={this.props.activate ? this.props.onMouseOver:()=>{}} onMouseLeave={this.props.activate ? this.props.onMouseLeave:()=>{}}>
                <div>
                    <div className="MenuTitle">{this.props.title}</div>
                </div>
                {(this.props.showMenuItem === this.props.index) &&
                    <div className="Menu">
                        <div className="MenuBorder">
                            <ul>
                                {this.props.children}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default UIMenu;