import { ResearchFiles } from "./research_files";

export class Research {
    idResearch;
    title: string;
    description: string;
    year: number;
    file: string;
    files: ResearchFiles[];

    constructor(title, description, year, file) {
        this.title = title
        this.description = description
        this.year = year
        this.file = file
    }
}