import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserDataService } from '../user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../../models/comment.model';
import { Survey } from '../../../models/survey.model';
import { SurveyDataService } from '../../survey/survey-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private _user: User;

  constructor(private userData: UserDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //Get user profile from resolver
    this.route.data.subscribe(item => {
      this._user = item['user'];
      this.user.comments.sort((a, b) => {
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      })
    });
  }

  //Navigates to selected survey
  showSurvey(survey: Survey) {
    this.router.navigate(['/survey/' + survey._id]);
  }

  get user(): User {
    return this._user;
  }

}
