import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: any = [];
  public fullName: string = "";

  constructor(private auth: AuthService, private api: ApiService, private userStore: UserStoreService) { }

  ngOnInit() {
    this.api.getAllUser()
      .subscribe(res => {
        this.users = res;
      });
    this.userStore.getfullNameFromStore()
      .subscribe(val => {
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || fullNameFromToken
      })
  }

  signOut() {
    this.auth.SignOut();
  }
}

