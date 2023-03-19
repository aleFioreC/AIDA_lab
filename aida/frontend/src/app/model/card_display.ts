export class CardDisplay {
    id: number;
    title: string;
    description: string
    file: string;

    constructor(id, title, description, file) {
        this.id = id
        this.title = title
        this.description = description
        this.file = file
    }
}