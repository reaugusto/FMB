import { MsgsProvider } from './../../providers/msgs/msgs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  servico: any;
  email: any = this.session.resgataEmail()
  isenabled: any;
  fimServico: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ServicoProvider, private session: SessionProvider, ) {
    this.servico = this.navParams.get('servico');
    console.log(this.servico);

    

    if (this.servico.email !== this.email) {
      //enable the button
      this.isenabled = true;   
    } else {
      //disable the button
      this.isenabled = false;

      if (this.servico.id_proposta) { //habilita finalizar servico apenas quando ja existe proposta
        this.fimServico = true;
      }

    }
  }

  fazerProposta() {
    this.navCtrl.push(FazerpropostaPage, { servico: this.servico });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicoSingularPage');
  }

  addChat(servico: any) {

    let newData = firebase.database().ref('chatrooms/').push();
    newData.set({
      roomname: servico.detalhes,
      user1: servico.email,
      user2: this.email
    });
  }

  finalizarServico(servico: any) {
    //aceitou que o servico foi entregue
    //enviar resposta positiva para o lado do requisitor da transacao
    console.log("funcionou " + servico.key);
  }

}
