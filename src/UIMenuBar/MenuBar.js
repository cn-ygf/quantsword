import React, { Component } from 'react';
import './MenuBar.css';
import UIMenu from '../Control/UIMenu/Menu'
import UIMenuItem from '../Control/UIMenu/MenuItem'



// 菜单栏
class UIMenuBar extends Component {
    
    constructor(){
        super()

        this.state = {
            showMenuItem: -1,
            activate: false
        }
    }

    render(){
        var menuItems = [{
            label: '文件(F)',
            items: [{
                label: '新建',
                key: 'Ctrl+N'
            }, {
                label: '打开',
                key: 'Ctrl+O'
            }, {
                label: '打印'
            }, {
                label: '退出',
                click: function(){
                    window.electron.ipcRenderer.send('on_menu_btn_exit')
                }
            }]
        }, {
            label: '编辑(E)',
            items: [{
                label: '复制',
                key: 'Ctrl+C'
            }, {
                label: '粘贴',
                key: 'Ctrl+P'
            }, {
                label: '全选',
                key: 'Ctrl+A'
            }, {
                label: '查找',
                key: 'Ctrl+F'
            }, {
                label: '清屏',
                key: 'Ctrl+X'
            }]
        }, {
            label: '工具(T)',
            items: [{
                label: '选项 ...'
            }]
        }, {
            label: '窗口(W)'
        }, {
            label: '帮助(H)',
            items: [{
                label: '欢迎使用'
            }, {
                label: '切换开发人员工具',
                click: function() {
                    window.electron.ipcRenderer.send('on_menu_btn_dev')
                }
            }, {
                label: '关于...',
                click: function() {
                    window.electron.ipcRenderer.send('on_menu_btn_about')
                }
            }]
        }]

        var handleMenuLevelHover = (index) => {
            this.setState({
                showMenuItem: index
            })
        }

        var handleMenuLevelLeave = (index) => {
        }

        var handleItemClick = (index) => {
            this.setState({
                showMenuItem: index,
                activate: true
            })
            document.body.addEventListener('click',bodyClick,true)
        }

        var bodyClick = () => {
            document.body.removeEventListener('click', bodyClick, true)
            this.setState({
                showMenuItem: -1,
                activate: false
            })
        }

        var subItemClick = (event,click) => {
            // 防止click冒泡
            event.stopImmediatePropagation()
            if(click){
                click()
            }
        }

        return (
            <div className="MenuBar">
                {menuItems.map((item, index) => (
                    <UIMenu 
                    title={item.label} 
                    showMenuItem={this.state.showMenuItem} 
                    activate={this.state.activate} 
                    index={index} 
                    itemClick={()=>{handleItemClick(index)}} 
                    onMouseOver={()=>{handleMenuLevelHover(index)}} 
                    onMouseLeave={()=>{handleMenuLevelLeave(index)} }>
                        {item.items && item.items.map((subItem,subIndex) => (
                            <UIMenuItem hotkey={subItem.key} subItemClick={(event)=>{subItemClick(event,subItem.click)}}>
                                {subItem.label}
                            </UIMenuItem>
                        ))}
                    </UIMenu>
                ))}
            </div>
            

            
        )
    }
}
export default UIMenuBar;