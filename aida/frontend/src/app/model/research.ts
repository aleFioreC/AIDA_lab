import { ResearchFiles } from "./research_files";
import { ResearchLang } from "./research_lang";

export class Research {
    idResearch: number;
    year: string;
    langs: ResearchLang[]
    files: ResearchFiles[];

    constructor(year, langs, files) {
        this.year = year
        this.langs = langs
        this.files = files
    }
}