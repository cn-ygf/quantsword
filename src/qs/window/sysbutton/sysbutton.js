/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const ipc = require('electron').ipcRenderer

function UISysButton(options) {
    this.main_div = document.createElement('div')
    this.main_div.classList.add('sysbutton')

    var minimize_div = document.createElement('div')
    minimize_div.classList.add('window-icon-bg')
    var minimize_div_item = document.createElement('div')
    minimize_div_item.classList.add('window-icon')
    minimize_div_item.classList.add('window-minimize')
    minimize_div.appendChild(minimize_div_item)
    this.main_div.appendChild(minimize_div)

    var maximize_div = document.createElement('div')
    maximize_div.classList.add('window-icon-bg')
    var maximize_div_item = document.createElement('div')
    maximize_div_item.classList.add('window-icon')
    maximize_div_item.classList.add('window-maximize')
    maximize_div_item.classList.add('window-max-restore')
    maximize_div.appendChild(maximize_div_item)
    this.main_div.appendChild(maximize_div)

    var unmaximize_div = document.createElement('div')
    unmaximize_div.style.display = 'none'
    unmaximize_div.classList.add('window-icon-bg')
    var unmaximize_div_item = document.createElement('div')
    unmaximize_div_item.classList.add('window-icon')
    unmaximize_div_item.classList.add('window-unmaximize')
    maximize_div_item.classList.add('window-max-restore')
    unmaximize_div.appendChild(unmaximize_div_item)
    this.main_div.appendChild(unmaximize_div)

    var close_div = document.createElement('div')
    close_div.classList.add('window-icon-bg')
    close_div.classList.add('window-close-bg')
    var close_div_item = document.createElement('div')
    close_div_item.classList.add('window-icon')
    close_div_item.classList.add('window-close')
    close_div.appendChild(close_div_item)
    this.main_div.appendChild(close_div)

    minimize_div_item.onclick = function() {
        ipc.send('on_btn_min')
    }

    maximize_div_item.onclick = function() {
        ipc.send('on_btn_max')
    }

    unmaximize_div_item.onclick = function() {
        ipc.send('on_btn_restore')
    }

    close_div_item.onclick = function() {
        ipc.send('on_btn_close')
    }

    ipc.on('on_max', () => {
        maximize_div.style.display = 'none'
        unmaximize_div.style.display = 'block'
    })

    ipc.on('on_restore', () => {
        maximize_div.style.display = 'block'
        unmaximize_div.style.display = 'none'
    })

    this.getDom = function() {
        return this.main_div
    }
}


exports.UISysButton = UISysButton