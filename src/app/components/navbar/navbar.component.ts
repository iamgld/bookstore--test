import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public appName = 'BookStore';
  public isLogged = false;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.isAuth()
      .subscribe(auth => {
        if (auth) {
          console.log('user logged');
          this.isLogged = true;
        } else {
          console.log('Not user logged');
          this.isLogged = false;
        }
      });
  }
  onSignOut(): void {
    this.afAuth.signOut();
  }

}
