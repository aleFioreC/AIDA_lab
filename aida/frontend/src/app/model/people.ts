export class People {
    name: string;
    surname: string;
    email: string;
    number: string;
    additionalInfo: string;
    role: string;
    file: string;

    constructor(name, surname, email, number, additionalInfo, role, file) {
        this.name = name
        this.surname = surname
        this.email = email
        this.number = number
        this.additionalInfo = additionalInfo
        this.role = role
        this.file = file
    }
}