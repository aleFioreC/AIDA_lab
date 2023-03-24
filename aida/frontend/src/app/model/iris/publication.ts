import { last } from "rxjs/operators";
import { Citation } from "./citation";
import { Journal } from "./journal";
import { Person } from "./person";

export class Publication {

    legacyid_i: number;
    handle: string;
    year: number;
    issued_dt: string;
    doi: string;
    keywords: string;
    title: string;
    descriptionAbstractAll: string;
    miur: string;
    score: number;
    collection: string;
    citation: string;
    authors: string;
    dateIssued: string;
    language: string;
    journal: Journal;
    fulltextPresence: string;
    ssd: string;
    lastModified: string;
    citationCount: Citation;
    person: Person[];
    stato: string;

    constructor(legacyid_i, handle, year, issued_dt, doi, keywords, title, descriptionAbstractAll,
        miur, score, collection, citation,
        authors, dateIssued, language, journal, fulltextPresence,
        ssd, lastModified, citationCount, person, stato) {
        this.legacyid_i = legacyid_i;
        this.handle = handle;
        this.year = year;
        this.issued_dt = issued_dt;
        this.doi = doi;
        this.keywords = keywords;
        this.title = title;
        this.descriptionAbstractAll = descriptionAbstractAll;
        this.miur = miur;
        this.score = score;
        this.collection = collection;
        this.citation = citation;
        this.authors = authors;
        this.dateIssued = dateIssued;
        this.language = language;
        this.journal = journal;
        this.fulltextPresence = fulltextPresence;
        this.ssd = ssd;
        this.lastModified = lastModified;
        this.citationCount = citation;
        this.person = person;
        this.stato = stato;
    }
}