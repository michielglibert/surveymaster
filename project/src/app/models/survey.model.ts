import { Comment } from "./comment.model";

export class Survey {
    public _id;
    private _vraag:string;
    private _antwoord1:string;
    private _antwoord2:string;
    private _comments:Comment[];

    constructor() {}

    get vraag() {
        return this._vraag;
    }

    get antwoord1() {
        return this._antwoord1;
    }

    get antwoord2() {
        return this._antwoord2
    }

    get comments() {
        return this._comments;
    }
}