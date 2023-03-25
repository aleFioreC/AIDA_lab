export class People {
    idPeople: number;
    name: string;
    surname: string;
    cf: string;
    email: string;
    number: string;
    additionalInfo: string;
    role: string;
    roleGroup: string;
    file: string;

    constructor(name, surname, cf, email, number, additionalInfo, role, group, file) {
        this.name = name
        this.surname = surname
        this.cf = cf
        this.email = email
        this.number = number
        this.additionalInfo = additionalInfo
        this.role = role
        this.roleGroup = group
        this.file = file
    }
}