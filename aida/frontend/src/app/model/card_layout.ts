export class CardLayout {
    title: string;
    cols: string;
    rows: string;
    description: string;

    constructor(title, cols, rows, description) {
        this.title = title
        this.cols = cols
        this.rows = rows
        this.description = description
    }
}