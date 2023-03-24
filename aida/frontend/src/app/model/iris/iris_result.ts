import { Publication } from "./publication";

export class IRISResult {

    resultList: Publication[];

    constructor(resultList) {
        this.resultList = resultList
    }
}