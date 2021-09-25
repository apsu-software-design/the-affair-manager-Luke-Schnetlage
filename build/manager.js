"use strict";
//your code goes here!
/*
-the manager must be able to:
-register new members to "the system" via email adress
-register new affairs to "the system" using a zip code and time
-register new organizations using their name
-add members to an affair, but avoid adding a member to an affair they're already attending
-search for members, affairs, or organizations by name, using 1 "core" function * use .filter()
-modify an affairs name and time
-add affairs to organizations using its affair, but not adding an affair to the same org twice
-list members involved in an affair, this should include email adresses * use .map()
*/
//import {member} from './member';
//import * as Members from './members';
//import {organizations} from './organizations';
//import {affairs} from './affairs';
//import * as Affairs from './affairs';
exports.__esModule = true;
exports.AffairManager = void 0;
var util_1 = require("util");
/*
Notes for tommorow luke:
most of this works, youre having issues with 7.List addair members
you have a test affiar named "die" with 2 members "jim" and "john"
for reasons I can not discover, members you add via the command line has an undefined name, or atleast its undefined when getMembers
gets its hands on it
*/
var AffairManager = /** @class */ (function () {
    function AffairManager() {
        this.Aorganizations = new organizations();
        this.Aaffairs = new affairs();
        this.Amembers = new members();
    }
    AffairManager.prototype.addMember = function (name, email) {
        this.Amembers.addmember(name, email);
    };
    AffairManager.prototype.addAffair = function (affairName, zipcode, date) {
        this.Aaffairs.addAffair(affairName, zipcode, date);
    };
    AffairManager.prototype.addOrganization = function (organizationName) {
        this.Aorganizations.addOrganization(organizationName);
    };
    AffairManager.prototype.addMemberToAffair = function (memberName, affairName) {
        if ((this.findMemberByName(memberName) == null) || (this.findAffairNames(affairName) == null)) {
            return -1;
        }
        var affair = this.findAffairByName(affairName)[0];
        var member = this.findMemberByName(memberName)[0];
        affair.addAffairMember(member);
    };
    AffairManager.prototype.addAffairToOrganization = function (affairName, organizationName) {
        //checks if the affair and organization are in the system, also checks if the org already sponsors the affair
        if ((this.findAffairNames(affairName) == null) || (this.findOrganizationNames(organizationName) == null)) {
            return false;
        }
        //else if ((this.findOrganizationByName(organizationName)[0]).orgAffairs. ){} //check the array orgAffairs for the affair
        //this.Aaffairs[this.Aaffairs.list.findIndex(this.findAffairNames(affairName)[0])].sponsor = this.Aorganizations[this.Aorganizations.list.findIndex(this.findOrganizationNames(organizationName)[0])];
        this.findOrganizationByName(organizationName)[0].addOrgAffair(this.findAffairByName(affairName)[0]);
    };
    //takes one of these two sets of perameters
    //(affairName, newTitle)
    //(affairName, undefined, newTime)
    AffairManager.prototype.modifyAffair = function (affairName, newTitle, newTime) {
        if (newTitle != undefined) {
            //this.Aaffairs[this.Aaffairs.list.findIndex(this.findAffairByName(affairName)[0])].name = newTitle;
            (this.findAffairByName(affairName)[0]).name = newTitle;
        }
        else {
            //this.Aaffairs[this.Aaffairs.list.findIndex(this.findAffairByName(affairName)[0])].date = newTime;
            (this.findAffairByName(affairName)[0]).date = newTime;
        }
    };
    AffairManager.prototype.getMembers = function (affairName) {
        return ((this.findAffairByName(affairName))[0]).getAttendeeNames();
    };
    AffairManager.prototype.findbyName = function (sName, array) {
        var object = array.filter(function (object) { return object.name == sName; });
        if ((0, util_1.isNullOrUndefined)(object)) {
            return undefined;
        }
        else {
            return object;
        }
    };
    AffairManager.prototype.findMemberByName = function (memberName) {
        return this.findbyName(memberName, this.Amembers.list);
    };
    AffairManager.prototype.findMemberNames = function (memberName) {
        return this.findMemberByName(memberName).map(function (member) { return member.name; });
    };
    AffairManager.prototype.findAffairByName = function (affairName) {
        return this.findbyName(affairName, this.Aaffairs.list);
    };
    AffairManager.prototype.findAffairNames = function (affairName) {
        return this.findAffairByName(affairName).map(function (affair) { return affair.name; });
    };
    AffairManager.prototype.findOrganizationByName = function (organizationName) {
        return this.findbyName(organizationName, this.Aorganizations.list);
    };
    AffairManager.prototype.findOrganizationNames = function (organizationName) {
        return this.findOrganizationByName(organizationName).map(function (organization) { return organization.name; });
    };
    return AffairManager;
}());
exports.AffairManager = AffairManager;
var member = /** @class */ (function () {
    function member(name, email) {
        this.email = email;
        this.name = name;
    }
    return member;
}());
var members = /** @class */ (function () {
    function members() {
        this.list = new Array();
    }
    members.prototype.addmember = function (name, email) {
        this.list.push(new member(name, email));
    };
    return members;
}());
var organization = /** @class */ (function () {
    function organization(name) {
        this.name = name;
        this.members = new Array;
        this.orgAffairs = new Array;
    }
    organization.prototype.addOrgAffair = function (affair) {
        this.orgAffairs.push(affair);
    };
    return organization;
}());
var organizations = /** @class */ (function () {
    function organizations() {
        this.list = new Array();
    }
    organizations.prototype.addOrganization = function (organizationName) {
        this.list.push(new organization(organizationName));
    };
    return organizations;
}());
var affair = /** @class */ (function () {
    function affair(name, zipCode, date) {
        this.name = name;
        this.zipCode = zipCode;
        this.date = date;
        this.attendeeList = new Array();
    }
    affair.prototype.addAffairMember = function (smember) {
        if ((this.attendeeList.indexOf(smember) == -1) && (smember != null)) {
            this.attendeeList.push(smember);
            return true;
        }
        return false;
    };
    affair.prototype.checkAttendeeList = function (member, array) {
        array.filter(function (object) {
            return object.name == member.name;
        });
        array.indexOf(member);
    };
    affair.prototype.getAttendeeNames = function () {
        var list = new Array();
        this.attendeeList.forEach(function (element) {
            list.push(element.name);
        });
        return list;
    };
    return affair;
}());
var affairs = /** @class */ (function () {
    function affairs() {
        this.list = new Array();
    }
    affairs.prototype.addAffair = function (affairName, zipcode, date) {
        this.list.push(new affair(affairName, zipcode, date));
    };
    return affairs;
}());
