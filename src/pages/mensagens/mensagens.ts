import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { RoomPage } from '../room/room';
import { MsgsProvider } from '../../providers/msgs/msgs';
import { SessionProvider } from '../../providers/session/session';
import { ServicoProvider } from '../../providers/servico/servico';

@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html'
})
export class MensagensPage {
  rooms : Observable<any>;
  rooms2: Observable<any>;
  email: any;




  constructor(public navCtrl: NavController, public navParams: NavParams, private session: SessionProvider, private provider: MsgsProvider) {
    this.email = this.session.resgataEmail();
    console.log(this.email);
      this.rooms = this.provider.getMeusChats(this.email);
      this.rooms2 = this.provider.getOutrosChats(this.email);
  }


  onClick() {
    this.navCtrl.push(RoomPage);
  }


  joinRoom(key,roomname) {
      this.navCtrl.push(RoomPage, {
        key:key,
        roomname:roomname,
        nickname:this.email
  });
  }



}
