import {member} from './member';

export class members{
    list : Array<member>;

    constructor(){
        this.list = new Array<member>();
    }

    addmember(name:string, email:string){
        this.list[this.list.length] = new member(name, email);
    }
}

