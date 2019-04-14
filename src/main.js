/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
var Datastore = require('nedb')
var path = require('path')
var db = new Datastore({
    filename: path.join(app.getPath('userData'), 'quantsword.db'),
    autoload: true
})

// 主窗口对象
let win

// 参数
var g_param = new Object()
g_param.isshowsessionmgr = false

// 创建主窗口
function createWindow() {
    app.setAppUserModelId('com.cnhonker.ygf.quantsword')
        // 读取配置文件
    db.findOne({ key: 'config' }, function(err, config) {
        if (config == null) {
            config = []
        }
        if (config.length < 1) {
            config.key = 'config'
            config.width = 900
            config.height = 500
            config.isshowsessionmgr = true
            config.ismax = false
            db.insert({
                key: 'config',
                width: config.width,
                height: config.height,
                isshowsessionmgr: config.isshowsessionmgr,
                ismax: config.ismax
            }, function(err) {})
        }
        win = new BrowserWindow({ width: config.width, height: config.height, frame: false, resizable: true, show: false })
        win.loadFile(`${__dirname}/qs/window/index.html`)
        win.setBackgroundColor('#1E1E1E')
        win.setTitle('QuantSword by YGF')
        win.setIcon(`${__dirname}/qs/window/logo.png`)
        win.setOverlayIcon(`${__dirname}/qs/window/logo.png`, 'Description for overlay')
        win.on('ready-to-show', () => {
            if (config.ismax) {
                win.maximize()
            } else {
                win.webContents.send('on_resize', win.getContentSize())
            }
            if (config.isshowsessionmgr) {
                win.webContents.send('on_show_session_mgr')
            }
            win.show()
            win.webContents.openDevTools()
        })

        win.on('closed', () => {
            win = null
        })

        win.on('maximize', () => {
            win.webContents.send('on_max')
        })

        win.on('unmaximize', () => {
            win.webContents.send('on_restore')
        })

        win.on('resize', () => {
            win.webContents.send('on_resize', win.getContentSize())
        })
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
})

app.on('browser-window-blur', () => {
    win.webContents.send('on_window_blur')
})

app.on('browser-window-focus', () => {
    win.webContents.send('on_window_focus')
})

ipc.on('on_btn_close', () => {
    save_config_exit()
})

ipc.on('on_btn_min', () => {
    win.minimize()
})

ipc.on('on_btn_max', () => {
    win.maximize()
})

ipc.on('on_btn_restore', () => {
    win.unmaximize()
})

ipc.on('on_menu_btn_dev', () => {
    win.webContents.openDevTools()
})

ipc.on('on_menu_btn_about', () => {
    const options = {
        type: 'info',
        title: 'QuantSword',
        message: '版本：1.0.1\r\n作者：YGF\r\n邮箱：ygf@cnhonker.com',
        buttons: ['确定'],
    }
    dialog.showMessageBox(win, options, function(index) {})
})

ipc.on('on_menu_btn_exit', () => {
    save_config_exit()
})

ipc.on('on_session_mgr_opend', (event, args) => {
    g_param.isshowsessionmgr = args
})

// 保存配置并且退出
function save_config_exit() {
    var size = win.getSize()
    var isMaximized = win.isMaximized()
    if (isMaximized) {
        size[0] = 900
        size[1] = 500
    }
    console.log(size)
    db.update({ key: 'config' }, {
        $set: {
            width: size[0],
            height: size[1],
            isshowsessionmgr: g_param.isshowsessionmgr,
            ismax: isMaximized
        }
    }, {}, function(err, numReplaced) {
        win.close()
    })
}