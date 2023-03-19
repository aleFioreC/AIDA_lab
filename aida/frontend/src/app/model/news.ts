import { NewsLang } from "./news_lang";

export class News {

    idNews: number;
    file: string;
    langs: NewsLang[]

    constructor(file, langs) {
        this.file = file
        this.langs = langs
    }
}