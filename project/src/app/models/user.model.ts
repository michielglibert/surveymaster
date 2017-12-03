import { Comment } from './comment.model'
import { Survey } from './survey.model';

export class User {
    private _username: string;
    private _comments: Comment[];
    private _surveys: Survey[];
    private _answeredSurveys: Survey[];

    get username(): string {
        return this._username;
    }

    get comments(): Comment[] {
        return this._comments;
    }

    get surveys(): Survey[] {
        return this._surveys;
    }

    get answeredSurveys(): Survey[] {
        return this._answeredSurveys;
    }
}