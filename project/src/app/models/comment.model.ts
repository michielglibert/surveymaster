import { User } from "./user.model";

export class Comment {
    private _user:User;
    private _comment:string;
    private _likes: [{_id: string, username: string}];
    liked:boolean;

    constructor() {}

    get user(): User {
        return this._user;
    }

    get comment(): string {
        return this._comment;
    }

    get likes(): [{_id: string, username: string}] {
        return this._likes;
    }

}