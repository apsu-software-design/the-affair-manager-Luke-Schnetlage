"use strict";
exports.__esModule = true;
exports.members = void 0;
var member_1 = require("./member");
var members = /** @class */ (function () {
    function members() {
        this.list = new Array();
    }
    members.prototype.addmember = function (name, email) {
        this.list[this.list.length] = new member_1.member(name, email);
    };
    return members;
}());
exports.members = members;
