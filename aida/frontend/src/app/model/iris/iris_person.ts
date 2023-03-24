
export class IRISPerson {

    lastname: string;
    firstname: string;
    mail: string;
    cf: string;
    id: string;
    idAb: string;
    pid: string;
    idCsa: string;

    constructor(lastname, firstname, mail, cf, id, idAb, pid, idCsa) {
        this.lastname = lastname
        this.firstname = firstname
        this.mail = mail
        this.cf = cf
        this.id = id
        this.idAb = idAb
        this.pid = pid
        this.idCsa = idCsa
    }
}