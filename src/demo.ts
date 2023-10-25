type ContactName = string;
interface Address {
    line1 : string;
    line2? : string;
    district : string;
    state : string;
    pincode : number;
    country : string;
}

interface Contact {
    id : number;
    name: ContactName;
    //clone(source : Contact) : Contact
}

interface UserContact<T> {
    id : number
    name : ContactName
    username : T
}

let primaryContact : Contact = {
    id : 1,
    name : "test User",
    // clone(source){
    //     return Object.apply({},source);
    // }
}

function clone<T1, T2 extends T1>(source: T1): T2{
    return Object.apply({},source);
}

const b = clone<Contact, UserContact<string>>(primaryContact)
console.log(b,primaryContact);