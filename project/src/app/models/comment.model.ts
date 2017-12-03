import { User } from "./user.model";
import { Survey } from "./survey.model";

export class Comment {
    private _user:User;
    private _comment:string;
    private _likes: [{_id: string, username: string}];
    private _posted:Date;
    private _survey:Survey;
    liked:boolean;

    constructor() {}

    get user(): User {
        return this._user;
    }

    get date():Date {
        return this._posted;
    }

    get comment(): string {
        return this._comment;
    }

    get likes(): [{_id: string, username: string}] {
        return this._likes;
    }

    get survey(): Survey {
        return this._survey;
    }

    get posted(): Date {
        return this._posted;
    }
}