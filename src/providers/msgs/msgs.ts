import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MsgsProvider {
  private PATH = 'chatrooms/';

  constructor(private db: AngularFireDatabase) {}

  getMeusChats(email){
    return this.db.list(this.PATH, ref => ref.orderByChild("user1").equalTo(email))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  getOutrosChats(email){
    return this.db.list(this.PATH, ref => ref.orderByChild("user2").equalTo(email))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }



}
