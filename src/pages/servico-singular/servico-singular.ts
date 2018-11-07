import { MsgsProvider } from './../../providers/msgs/msgs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ServicoProvider } from '../../providers/servico/servico';
import { FazerpropostaPage } from '../fazerproposta/fazerproposta';
import * as firebase from 'Firebase';
import { SessionProvider } from '../../providers/session/session';
/**
 * Generated class for the ServicoSingularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servico-singular',
  templateUrl: 'servico-singular.html',
})
export class ServicoSingularPage {
  servico: string;
  email:any = this.session.resgataEmail()

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ServicoProvider, private session: SessionProvider,) {
    //recebendo o servico que foi clicado na pagina anterior

    this.servico = this.navParams.get('servico');
    console.log(this.servico);
    //recuperando o usuario da sessao com base no id passado pela pagina anterior
    //this.servicos = this.provider.get(this.id_servico); // rever se é um observable que receberá o único objeto do BD

  }

  fazerProposta(){
    this.navCtrl.push(FazerpropostaPage, {servico: this.servico});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicoSingularPage');
  }

  addChat(servico: any) {

    let newData = firebase.database().ref('chatrooms/').push();
    newData.set({
      roomname:servico.detalhes,
      user1: servico.email,
      user2: this.email
    });
  }

}
