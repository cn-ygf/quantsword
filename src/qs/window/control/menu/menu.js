/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function UIMenuBar(options) {
    this.menu_bar = document.createElement('div')
    this.menu_bar.classList.add('menubar')
    this.menu_bar.style.height = '30px'
    this.menu_items = new Array()
    this.menu_bar_items = new Array()
    this.menu_bar_activate = false
    this.hide_all_menu = function() {
        for (var i = 0; i < this.menu_items.length; i++) {
            this.menu_items[i].hide()
        }
    }
    this.menu_bar_mouse_activate = function() {
        for (var i = 0; i < this.menu_bar_items.length; i++) {
            this.menu_bar_items[i].addEventListener('mouseover', function() {
                if (this.menuobj) {
                    if (this.pthis.menu_bar_activate) {
                        if (this.menuobj.isShow == false) {
                            this.pthis.hide_all_menu()
                            this.menuobj.show()
                        }
                    }
                }

            }, true)
        }
    }
    this.create_menu = function(items, item_bar, item_bg, pthis) {
        var menu = new UIMenu(items)
        this.menu_items.push(menu)
        item_bar.appendChild(menu.getDom())
        item_bg.onclick = function() {
            menu.show()
            let body_click = function(m, p) {
                return function() {
                    document.body.removeEventListener('click', body_click(menu, pthis), true)
                    pthis.hide_all_menu()
                    p.menu_bar_activate = false
                }
            }
            document.body.addEventListener('click', body_click(menu, pthis), true)
            pthis.menu_bar_activate = true

        }
        return menu
    }

    for (var i = 0; i < options.length; i++) {
        var menu_bar_item = document.createElement('div')
        menu_bar_item.classList.add('menubar-menu-button')
        var menu_bar_item_bg = document.createElement('div')
        var menu_bar_item_title = document.createElement('div')
        menu_bar_item_title.innerHTML = options[i].label
        menu_bar_item_title.classList.add('menubar-menu-title')
        menu_bar_item_bg.appendChild(menu_bar_item_title)
        menu_bar_item.appendChild(menu_bar_item_bg)
        this.menu_bar.appendChild(menu_bar_item)
        if (options[i].items) {
            var menu = this.create_menu(options[i].items, menu_bar_item, menu_bar_item_bg, this)
            menu_bar_item_bg.menuobj = menu
            menu_bar_item_bg.pthis = this
        }
        this.menu_bar_items.push(menu_bar_item_bg)
    }
    this.menu_bar_mouse_activate()

    this.getDom = function() {
        return this.menu_bar
    }


}

function UIMenu(options) {
    this.main_div = document.createElement('div')
    this.main_div.classList.add('menu')
    this.isShow = false
    var menu_div = document.createElement('div')
    menu_div.style.paddingTop = '6px'
    menu_div.style.paddingBottom = '6px'
    var ul = document.createElement('ul')
    for (var i = 0; i < options.length; i++) {
        var li = document.createElement('li')
        var span = document.createElement('span')
        span.innerHTML = options[i].label
        li.appendChild(span)
        if (options[i].key) {
            var span_key = document.createElement('span')
            span_key.innerHTML = options[i].key
            span_key.style.fontSize = 'inherit'
            span_key.style.float = 'right'
            li.appendChild(span_key)
        }
        if (options[i].click) {
            let li_click = function(c_func, pthis) {
                return function() {
                    c_func()
                    pthis.hide()
                }
            }
            li.addEventListener('click', li_click(options[i].click, this), false)
        }
        ul.appendChild(li)
    }
    menu_div.appendChild(ul)
    this.main_div.appendChild(menu_div)

    this.show = function() {
        this.main_div.style.display = 'inline-block'
        this.isShow = true
    }
    this.hide = function() {
        this.main_div.style.display = 'none'
        this.isShow = false
    }
    this.getDom = function() {
        return this.main_div
    }
}


exports.UIMenuBar = UIMenuBar
exports.UIMenu = UIMenu