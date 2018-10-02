import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from './user';
import * as firebase from 'firebase/app'
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

createUser(user: User) {
  return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
}

}
