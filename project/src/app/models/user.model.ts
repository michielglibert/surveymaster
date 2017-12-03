import { Comment } from './comment.model'

export class User {
    private _username: string;
    private _comments: Comment[];

    get username(): string {
        return this._username;
    }

    get comments(): Comment[] {
        return this._comments;
    }
}