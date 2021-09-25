//an affair has a zip code, a time, and may or may not be sponsored by an organization
import * as member from './member';
import * as organization from './organization';

export class affair{
    name : string;
    zipCode : string;
    date : string;
    sponsor : organization.organization;
    attendeeList: Array<member.member>;


    constructor(name: string, zipCode: string, date : string){
        this.name = name;
        this.zipCode = zipCode;
        this.date = date;
        this.attendeeList = new Array();
    }
    
    addAffairMember(smember:member.member) {
        if ( this.checkAttendeeList(smember.name, this.attendeeList) == null){
            this.attendeeList.push(smember);
            return true;
        } else {
            return false; 
        }
        this.attendeeList.filter
    }

    checkAttendeeList(Name:string, array: Array<member.member>){
        array.filter(object => {
            return object.name == Name;
        })
    }
}


