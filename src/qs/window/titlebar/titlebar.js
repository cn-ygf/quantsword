/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function UITitleBar(options) {
    this.main_div = document.createElement('div')
    this.main_div.classList.add('titlebar')
    this.main_div.style.backgroundColor = options.backgroundColor
    this.main_div.style.color = options.color
    this.main_div.style.width = '100%'
    this.main_div.style.height = options.height
    this.main_div.style.setProperty('-webkit-app-region', 'drag')
    this.icon_div = document.createElement('div')
    this.icon_div.classList.add('window-appicon')
    this.icon_div.style.backgroundImage = options.icon
    this.main_div.appendChild(this.icon_div)
    if (options.menu_bar) {
        this.main_div.appendChild(options.menu_bar.getDom())
    }
    this.title_div = document.createElement('div')
    this.title_div.classList.add('window-title')
    this.title_div.innerHTML = options.title
    this.main_div.appendChild(this.title_div)
    if (options.sys_button) {
        this.main_div.appendChild(options.sys_button.getDom())
    }
    this.show = function() {
        document.body.appendChild(this.main_div)
    }
    this.hide = function() {
        document.body.removeChild(this.main_div)
    }
    this.setTitle = function(title) {
        this.title_div.innerHTML = title
    }
    this.setIcon = function(icon) {
        this.icon_div.style.backgroundImage = icon
    }
    this.setBackgroundColor = function(color) {
        this.main_div.style.backgroundColor = color
    }
}


exports.UITitleBar = UITitleBar