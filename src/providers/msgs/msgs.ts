import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MsgsProvider {
  private PATH = 'chatrooms/';

  constructor(private db: AngularFireDatabase) { }

  getMeusChats(email) {
    return this.db.list(this.PATH, ref => ref.orderByChild("user1").equalTo(email))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  getOutrosChats(email) {
    return this.db.list(this.PATH, ref => ref.orderByChild("user2").equalTo(email))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  newChat(servico, email) {
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH)
        .push({
          roomname: servico.titulo,
          user1: servico.email,
          user2: email
        })
        .then(() => resolve());
    });

  }

  getChatsServico(roomname) {
    return this.db.list(this.PATH, ref => ref.orderByChild("roomname").equalTo(roomname))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  removeAoFinalizar(roomname) {
    let roomMsgs = this.getChatsServico(roomname);

    roomMsgs.forEach(val => {
      for (let i = 0; i < val.length; i++) {
        this.remove(val[i].key);
      }
    });
  }

  remove(key: any) {//apaga do banco
    return this.db.list(this.PATH).remove(key);
  }



}
