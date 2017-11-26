export class Survey {
    private _vraag:string;
    private _antwoord1:string;
    private _antwoord2:string;

    get vraag() {
        return this._vraag;
    }

    get antwoord1() {
        return this._antwoord1;
    }

    get antwoord2() {
        return this._antwoord2
    }
}