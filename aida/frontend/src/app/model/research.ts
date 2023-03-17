import { ResearchFiles } from "./research_files";

export class Research {
    idResearch;
    title: string;
    description: string;
    year: number;
    file: string;
    files: ResearchFiles[];

    constructor(title, description, year, files) {
        this.title = title
        this.description = description
        this.year = year
        this.files = files
    }
}