export class NewsLang {
    idNewsLang: number;
    title: string;
    description: string;
    language: string;

    constructor(title, description, language) {
        this.title = title
        this.description = description
        this.language = language
    }
}