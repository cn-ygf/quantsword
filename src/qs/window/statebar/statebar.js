/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function UIStateBar(options) {
    this.main_div = document.createElement('div')
    this.main_div.classList.add('statebar')
    this.main_div.style.backgroundColor = options.backgroundColor
    this.main_div.style.height = options.height + 'px'
    this.show = function() {
        document.body.appendChild(this.main_div)
    }
    this.hide = function() {
        document.body.removeChild(this.main_div)
    }
    this.setTop = function(top) {
        this.main_div.style.top = (top - options.height) + 'px'
    }
}


exports.UIStateBar = UIStateBar