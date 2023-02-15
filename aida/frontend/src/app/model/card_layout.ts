export class CardLayout {
    id: number;
    title: string;
    cols: string;
    rows: string;
    description: string;
    file: string;

    constructor(id, title, cols, rows, description, file) {
        this.id = id
        this.title = title
        this.cols = cols
        this.rows = rows
        this.description = description
        this.file = file
    }
}