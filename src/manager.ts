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

import { isNullOrUndefined } from 'util';

/* 
Notes for tommorow luke:
most of this works, youre having issues with 7.List addair members
you have a test affiar named "die" with 2 members "jim" and "john"
for reasons I can not discover, members you add via the command line has an undefined name, or atleast its undefined when getMembers
gets its hands on it
*/
export class AffairManager{

    Aorganizations : organizations;
    Aaffairs : affairs;
    Amembers : members;
    

    public constructor(){
        this.Aorganizations = new organizations();
        this.Aaffairs = new affairs();
        this.Amembers = new members();

    }

    addMember(name: string, email: string){
        this.Amembers.addmember(name,email);
    }

    addAffair(affairName:string, zipcode:string, date:string){
        this.Aaffairs.addAffair(affairName,zipcode,date);
    }

    addOrganization(organizationName : string){
        this.Aorganizations.addOrganization(organizationName);
    }

    addMemberToAffair(memberName :string, affairName:string){
        if ((this.findMemberByName(memberName) == null)||(this.findAffairNames(affairName) == null)){
            return -1;
        }
        let affair = this.findAffairByName(affairName)[0];
        let member = this.findMemberByName(memberName)[0];

        affair.addAffairMember(member);
    }
    
    addAffairToOrganization(affairName, organizationName){
        //checks if the affair and organization are in the system, also checks if the org already sponsors the affair
       
        if ((this.findAffairNames(affairName) == null) || (this.findOrganizationNames(organizationName) ==null)){
            return false;
        }
        //else if ((this.findOrganizationByName(organizationName)[0]).orgAffairs. ){} //check the array orgAffairs for the affair

        //this.Aaffairs[this.Aaffairs.list.findIndex(this.findAffairNames(affairName)[0])].sponsor = this.Aorganizations[this.Aorganizations.list.findIndex(this.findOrganizationNames(organizationName)[0])];
        this.findOrganizationByName(organizationName)[0].addOrgAffair(this.findAffairByName(affairName)[0]);
    }
    
    //takes one of these two sets of perameters
    //(affairName, newTitle)
    //(affairName, undefined, newTime)
    modifyAffair(affairName:string, newTitle : string, newTime?:string){
        if (newTitle != undefined){
            (this.findAffairByName(affairName)[0]).name = newTitle;
        }
        else{
            (this.findAffairByName(affairName)[0]).date = newTime;
        }
    }

    getMembers(affairName:string){
        return ((this.findAffairByName(affairName))[0]).getAttendeeNames();
    }

    
    findbyName(sName:string, array: Array<member|organization|affair>){
        
        var object: any[] = array.filter(object => {return object.name == sName;});
        
        if(isNullOrUndefined(object)){
            return undefined;
        } else{
            return object;
        }
    }

    findMemberByName(memberName: string){
        return this.findbyName(memberName, this.Amembers.list);
    }
    findMemberNames(memberName: string){
        return this.findMemberByName(memberName).map(function(member){ return member.name});
        
    }
    
    findAffairByName(affairName:string){
        return this.findbyName(affairName, this.Aaffairs.list);
    }
    findAffairNames(affairName:string){
        return this.findAffairByName(affairName).map(function(affair){ return affair.name});
    }

    findOrganizationByName(organizationName:string){
        return this.findbyName(organizationName, this.Aorganizations.list);
    }
    findOrganizationNames(organizationName:string){
        return this.findOrganizationByName(organizationName).map(function(organization){ return organization.name});
    }
}


class member{
    name : string;
    email: string;

    public constructor(name:string, email:string){
        this.email = email;
        this.name = name;
    }   
}
class members{
    list : Array<member>;
    constructor(){
        this.list = new Array<member>();
    }
    addmember(name:string, email:string){
        this.list.push(new member(name,email));
    }

}

class organization{
    name : string;
    members : Array<member>;
    orgAffairs : Array<affair>

    constructor(name:string){
        this.name = name;
        this.members = new Array;
        this.orgAffairs = new Array;
    }

    addOrgAffair(affair:affair){
        this.orgAffairs.push(affair);
    }

}
class organizations{
    list : Array<organization>;

    constructor(){
        this.list = new Array<organization>();
    }
    addOrganization(organizationName : string){
        this.list.push(new organization(organizationName));
    }
}

class affair{
    name : string;
    zipCode : string;
    date : string;
    sponsor : organization;
    public attendeeList: Array<member>;

    constructor(name: string, zipCode: string, date : string){
        this.name = name;
        this.zipCode = zipCode;
        this.date = date;
        this.attendeeList = new Array();
    }
    
    addAffairMember(smember:member) {
        if ( (this.attendeeList.indexOf(smember) == -1) && (smember != null)){
            this.attendeeList.push(smember);
            return true;
        }
        return false;
    }

    checkAttendeeList(member:member, array: Array<member>){
        array.filter(object => {
            return object.name == member.name;
        })
        array.indexOf(member)
    }

    getAttendeeNames(){
        var list = new Array<string>();
        this.attendeeList.forEach(element => {
                list.push(element.name);
               
        });

        return list;
    }
}
class affairs{
    list : Array<affair>;

    constructor(){
        this.list = new Array<affair>();
    }

    addAffair(affairName:string, zipcode:string, date:string){
        this.list.push(new affair(affairName,zipcode,date));
    }
}