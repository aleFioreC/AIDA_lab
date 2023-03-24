import { IRISPublication } from "./iris_publication";

export class IRISResult {

    resultList: IRISPublication[];

    constructor(resultList) {
        this.resultList = resultList
    }
}