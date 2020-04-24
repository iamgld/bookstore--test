import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email = '';
  public password = '';
  public uploadPercent: number;
  public urlImage: Observable<string>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {

  }

  onUpload(e: any): void {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/${id}`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    const percent = task.percentageChanges();
    // tslint:disable-next-line: variable-name
    percent.subscribe((number) => this.uploadPercent = number);
    task.snapshotChanges()
      .pipe(finalize(() => this.urlImage = ref.getDownloadURL()))
      .subscribe();
  }

  onAddUser(): void {
    this.authService.registerUser(this.email, this.password)
      .then(res => {
        this.authService.isAuth()
          .subscribe(user => {
            if (user) {
              user.updateProfile({
                displayName: '',
                photoURL: this.inputImageUser.nativeElement.value
              })
                .then(() => console.log('user update'))
                .catch((err) => console.log('err', err));
            }
          });
        this.router.navigate(['admin/list-books']);
      }).catch(err => console.log('err', err.message));
  }

  onLoginFacebook(): void {
    // this.authService.loginFacebookUser()
    //   .then(res => {
    //     this.onLoginRedirect();
    //   }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then(res => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

}
