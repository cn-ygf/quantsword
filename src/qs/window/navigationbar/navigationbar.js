/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function UINavigationBar(options) {
    this.item_list = new Array()
    this.main_div = document.createElement('div')
    this.main_div.classList.add('navigationbar')
    this.main_div.style.backgroundColor = options.backgroundColor
    this.main_div.style.width = options.width
    this.top_div = document.createElement('div')
    this.top_div.style.width = options.width
    this.top_div.style.height = '100%'
    this.bottom_div = document.createElement('div')
    this.bottom_div.style.width = options.width
    this.bottom_div.style.position = 'absolute'
    this.bottom_div.style.bottom = '55px'
    this.main_div.appendChild(this.top_div)
    this.main_div.appendChild(this.bottom_div)

    for (var i = 0; i < options.items.length; i++) {
        var item_bg = document.createElement('div')
        item_bg.classList.add('item_bg')
        if (options.items[i].title) {
            item_bg.setAttribute('title', options.items[i].title)
        }
        if (options.items[i].image) {
            item_bg.style.setProperty('-webkit-mask', options.items[i].image)
        }
        if (options.items[i].click) {
            item_bg.addEventListener('click', options.items[i].click)
        }
        if (options.items[i].align == 'bottom') {
            this.bottom_div.appendChild(item_bg)
        } else {
            this.top_div.appendChild(item_bg)
        }
        this.item_list.push(item_bg)
    }

    this.show = function() {
        document.body.appendChild(this.main_div)
    }
    this.hide = function() {
        document.body.removeChild(this.main_div)
    }
    this.clearSelect = function() {
        for (var i = 0; i < this.item_list.length; i++) {
            this.item_list[i].classList.remove('checked')
        }
    }
    this.setSelected = function(index) {
        if (this.item_list[index]) {
            this.clearSelect()
            this.item_list[index].classList.add('checked')
        }
    }
}


exports.UINavigationBar = UINavigationBar