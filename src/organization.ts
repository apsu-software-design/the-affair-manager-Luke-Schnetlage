//an organization has a name and a list of members
import * as member from './member';

export class organization{
    name : string;
    members : Array<member.member>;

    constructor(name:string){
        this.name = name;
        this.members = new Array;
    }
}

