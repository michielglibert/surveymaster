import { Comment } from "./comment.model";

export class Survey {
    public _id;
    private _vraag:string;
    private _antwoord1:string;
    private _antwoord2:string;
    private _comments:Comment[];
    private _countAntwoord1:number;
    private _countAntwoord2:number;
    private _answered:boolean;

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

    get countAntwoord1(): number {
        return this._countAntwoord1;
    }

    set countAntwoord1(countAntwoord1:number) {
        this._countAntwoord1 = countAntwoord1
    }

    get countAntwoord2(): number {
        return this._countAntwoord2;
    }

    set countAntwoord2(countAntwoord2:number) {
        this._countAntwoord2 = countAntwoord2;
    }

    get answered(): boolean {
        return this._answered;
    }

    set answered(answered: boolean) {
        this._answered = answered;
    }


}