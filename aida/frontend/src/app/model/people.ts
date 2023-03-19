export class People {
    idPeople: number;
    name: string;
    surname: string;
    email: string;
    number: string;
    additionalInfo: string;
    role: string;
    roleGroup: string;
    file: string;

    constructor(name, surname, email, number, additionalInfo, role, group, file) {
        this.name = name
        this.surname = surname
        this.email = email
        this.number = number
        this.additionalInfo = additionalInfo
        this.role = role
        this.roleGroup = group
        this.file = file
    }
}