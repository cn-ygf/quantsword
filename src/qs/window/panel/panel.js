/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function UIPanel(options) {
    this.item_list = new Array()
    this.main_div = document.createElement('div')
    this.main_div.classList.add('panel')
    this.show = function() {
        document.body.appendChild(this.main_div)
    }
    this.hide = function() {
        document.body.removeChild(this.main_div)
    }
}

exports.UIPanel = UIPanel