import React, { Component } from 'react';
import './TitleBar.css';
import UIMenuBar from '../UIMenuBar/MenuBar'

// 标题栏
class UITitleBar extends Component {
    render() {
        var style = {
            backgroundColor : this.props.bkcolor,
            color: this.props.color,
            height : this.props.height
        }
        var menuOptions = [{
            label: '文件(F)',
            items: [{
                label: '新建',
                key: 'Ctrl+N'
            }, {
                label: '打开',
                key: 'Ctrl+O'
            }, {
                label: '断开'
            }, {
                label: '重新连接',
                key: 'Ctrl+R'
            }, {
                label: '打印'
            }, {
                label: '退出',
                click: function() {
                    window.electron.ipcRenderer.send('on_menu_btn_exit')
                }
            }]
        }, {
            label: '编辑(E)',
            items: [{
                label: '复制',
                key: 'Ctrl+Shift+C'
            }, {
                label: '粘贴',
                key: 'Ctrl+Shift+P'
            }, {
                label: '全选',
                key: 'Ctrl+Shift+A'
            }, {
                label: '查找',
                key: 'Ctrl+F'
            }, {
                label: '清屏'
            }]
        }, {
            label: '工具(T)',
            items: [{
                label: '选项 ...'
            }]
        }, {
            label: '选项卡(B)'
        }, {
            label: '窗口(W)'
        }, {
            label: '帮助(H)',
            items: [{
                label: '欢迎使用',
                click: function() {}
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
        return (
            <div className="TitleBar" style={style}>
                <div className="Icon"></div>
                {<UIMenuBar />}
                <div className="Title">{this.props.title}</div>
            </div>
        );
    }
  }
  
  export default UITitleBar;