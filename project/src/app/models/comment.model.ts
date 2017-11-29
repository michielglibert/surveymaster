import { User } from "./user.model";

export class Comment {
    private _user:User;
    private _comment:string;

    constructor() {}

    get user(): User {
        return this._user;
    }

    get comment(): string {
        return this._comment;
    }
}