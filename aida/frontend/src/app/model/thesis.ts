import { ThesisLang } from "./thesis_lang";

export class Thesis {

    idThesis: number;
    file: string;
    langs: ThesisLang[]

    constructor(file, langs) {
        this.file = file
        this.langs = langs
    }
}