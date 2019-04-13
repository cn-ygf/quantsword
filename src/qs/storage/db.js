/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var Datastore = require('nedb'),
    path = require('path'),
    db = new Datastore({
        filename: path.join(require('electron').app.getPath('userData'), 'quantsword.db'),
        autoload: true
    })

function Databse() {
    this.insert = function(doc) {
        db.insert(doc, function(err) {})
    }
}


exports.Databse = Databse