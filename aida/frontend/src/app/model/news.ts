export class News {
    idNews: number;
    title: string;
    description: string;
    file: string;

    constructor(title, description, file) {
        this.title = title
        this.description = description
        this.file = file
    }
}