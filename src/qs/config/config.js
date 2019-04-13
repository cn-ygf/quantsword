/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var Databse = require('../storage/db').Databse

db = new Databse

module.exports = {
    save_window_size: function(size) {
        db.insert({
            width: size[0],
            height: size[1]
        })
    },
    get_window_size: function() {

    }
}