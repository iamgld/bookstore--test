import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) { }

  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user);
        })
        .catch(err => console.log(reject(err)));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData))
        .catch(err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider())
      // .then(credential => this.updateUserData(credential.user));
      .then((credential) => {
        console.log(credential);
      }).catch((err) => console.log(err));
  }

  loginGoogleUser() {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user));
  }

  logoutUser() {
    return this.afAuth.signOut();
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const data: User = {
      id: user.uid,
      email: user.email,
      roles: {
        admin: false
      }
    };
    return userRef.set(data, { merge: true });
  }

  isUserAdmin(userUid: string): boolean {
    let isAdmin = false;
    const users = this.afStore.doc<User>(`users/${userUid}`).valueChanges();
    users.subscribe((user) => {
      isAdmin = user.roles.admin;
    });
    return isAdmin;
  }

}
