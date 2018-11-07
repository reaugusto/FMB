import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {

  @ViewChild(Content) content: Content;

  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  roomname: string;
  offStatus:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.roomname = this.navParams.get("roomname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    console.log(this.roomname);

    firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          if(this.content._scroll!=null){
            this.content.scrollToBottom(100)
          }
        }
      }, 100);
    });
  }

  sendMessage() {
    if(this.data.message != ""){
      let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
      newData.set({
        type:this.data.type,
        user:this.data.nickname,
        message:this.data.message,
        sendDate:Date()
      });
      this.data.message = '';
    }
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
};
