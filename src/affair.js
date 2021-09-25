"use strict";
exports.__esModule = true;
exports.affair = void 0;
var affair = /** @class */ (function () {
    function affair(name, zipCode, date) {
        this.name = name;
        this.zipCode = zipCode;
        this.date = date;
        this.attendeeList = new Array();
    }
    affair.prototype.addAffairMember = function (smember) {
        if (this.checkAttendeeList(smember.name, this.attendeeList) == null) {
            this.attendeeList.push(smember);
            return true;
        }
        else {
            return false;
        }
        this.attendeeList.filter;
    };
    affair.prototype.checkAttendeeList = function (Name, array) {
        array.filter(function (object) {
            return object.name == Name;
        });
    };
    return affair;
}());
exports.affair = affair;
