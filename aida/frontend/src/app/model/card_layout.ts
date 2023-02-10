export class CardLayout {
    title: string;
    cols: string;
    rows: string;
    description: string;
    file: string;

    constructor(title, cols, rows, description, file) {
        this.title = title
        this.cols = cols
        this.rows = rows
        this.description = description
        this.file = file
    }
}