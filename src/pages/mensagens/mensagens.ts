import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'Firebase';

@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html'
})
export class MensagensPage {
  rooms = [];
  ref = firebase.database().ref('chatrooms/');


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

  onClick() {
    console.log("click");
    this.navCtrl.push(RoomPage);
    }
  joinRoom(key,roomname) {
      this.navCtrl.push(RoomPage, {
        key:key,
        roomname:roomname,
        nickname:"gustavo"
  });
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
}
