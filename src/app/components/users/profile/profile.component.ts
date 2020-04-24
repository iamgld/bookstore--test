import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  public user: User = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };
  public providerId = 'null';

  constructor(
    private afAuth: AuthService
  ) { }

  ngOnInit(): void {
    this.afAuth.isAuth()
      .subscribe(user => {
        if (user) {
          this.user.name = user.displayName;
          this.user.email = user.email;
          this.user.photoUrl = user.photoURL;
          this.providerId = user.providerData[0].providerId;
        }
      });
  }

}
