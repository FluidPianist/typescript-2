type ContactName = string;
type ContactBirthDate = Date | string | number
type ContactStatus = "active" | "inactive" | "new"

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
    // birthdate? : ContactBirthDate
    // status? : ContactStatus
    // address? : Address
    //clone(source : Contact) : Contact
}

type AddressAndContact = Contact & Address

interface UserContact<T> {
    id : number
    name : ContactName
    username : T
}

let primaryContact : Contact = {
    id : 1,
    name : "test User",
    //status : "new"
    // clone(source){
    //     return Object.apply({},source);
    // }
}

function clone<T1, T2 extends T1>(source: T1): T2{
    return Object.apply({},source);
}

const b = clone<Contact, UserContact<string>>(primaryContact)

type ContactField = keyof Contact
const field: ContactField = "name"

const myType = { min: 1 , max : 200}
function save(source : typeof myType){};

interface ContactEvent {
    contactId: Contact["id"];
}

interface ContactDeletedEvent extends ContactEvent { 
}

interface ContactStatusChangedEvent extends ContactEvent { 
    oldStatus: ContactStatus;
    newStatus: ContactStatus;
}

interface ContactEvents {
    deleted: ContactDeletedEvent;
    statusChanged: ContactStatusChangedEvent;
    // ... and so on
}

function getValue<T, U extends keyof T>(source: T, propertyName: U) {
    return source[propertyName];
}

function handleEvent<T extends keyof ContactEvents>(
    eventName: T,
    handler: (evt: ContactEvents[T]) => void
) {
    if (eventName === "statusChanged") {
        handler({ contactId: 1, oldStatus: "active", newStatus: "inactive" })
    }
}

//handleEvent("statusChanged", evt => console.log(evt))

let x : Record<string, string | number | boolean | Function> = { name : "Wayne"}
x.number = 123;
x.active = true;
x.log = () => console.log("dynamically added function")


interface Query {
    sort?: 'asc' | 'desc';
    matches(val): boolean;
}

function searchContacts(contacts: Contact[], query: Record<keyof Contact,Query>) {
    return contacts.filter(contact => {
        for (const property of Object.keys(contact)) {
            // get the query object for this property
            const propertyQuery = query[property];
            // check to see if it matches
            if (propertyQuery && propertyQuery.matches(contact[property])) {
                return true;
            }
        }

        return false;
    })
}

const filteredContacts = searchContacts(
    [/* contacts */],
    {
        id: { matches: (id) => id === 123 },
        name: { matches: (name) => name === "Carol Weaver" },
       // phoneNumber: { matches: (name) => name === "Carol Weaver" },
    }
);