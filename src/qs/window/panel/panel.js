/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function UIPanel(options) {
    this.group_item_list = new Array()
    this.main_div = document.createElement('div')
    this.main_div.classList.add('panel')
    this.title_div = document.createElement('div')
    this.title_div.classList.add('title')
    this.title_h2 = document.createElement('h2')
    this.title_h2.innerHTML = options.title
    this.title_div.appendChild(this.title_h2)
    this.main_div.appendChild(this.title_div)

    this.removeAllSelect = function() {
        for (var i = 0; i < this.group_item_list.length; i++) {
            this.group_item_list[i].getDom().classList.remove('selected')
        }
    }
    this.show = function() {
        document.body.appendChild(this.main_div)
    }
    this.hide = function() {
        document.body.removeChild(this.main_div)
    }
    this.addGroup = function(item) {
        this.main_div.appendChild(item.getDom())
        item.setParent(this)
        this.group_item_list.push(item)
    }

}

// 分组项
function UIPanelGroupItem(options) {
    this.main_div = document.createElement('div')
    this.main_div.classList.add('groupitem')
    this.title_h3 = document.createElement('h3')
    this.title_h3.innerHTML = options.title
    this.main_div.appendChild(this.title_h3)
    this.bexpand = false
    var pthis = this
    this.setParent = function(p) {
        pthis.parent = p
    }
    this.addItem = function(item) {

    }
    this.expand = function(b) {
        this.bexpand = b
        if (b) {
            this.main_div.classList.add('expanded')
        } else {
            this.main_div.classList.remove('expanded')
        }
    }
    this.getDom = function() {
        return this.main_div
    }
    this.expand(true)
    this.main_div.onclick = function() {
        pthis.parent.removeAllSelect()
        pthis.main_div.classList.add('selected')
        pthis.expand(!pthis.bexpand)
    }
}

// 子项
function UIPanelItem(options) {
    this.main_div = document.createElement('div')
    this.getDom = function() {
        return this.main_div
    }
}

exports.UIPanel = UIPanel
exports.UIPanelGroupItem = UIPanelGroupItem
exports.UIPanelItem = UIPanelItem