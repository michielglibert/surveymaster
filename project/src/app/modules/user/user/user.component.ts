import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserDataService } from '../user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private _user: User;

  constructor(private userData: UserDataService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this._user = item['user'];
      this.user.comments.sort((a, b) =>{
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      })
    });
  }

  get user(): User {
    return this._user;
  }

}
