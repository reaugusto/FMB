import { MsgsProvider } from './../../providers/msgs/msgs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicoProvider: ServicoProvider,
    private session: SessionProvider, private alertController: AlertController) {
    this.servico = this.navParams.get('servico');

    console.log(this.servico);

    /*    if(this.servico.email === this.email && this.servico.id_proposta){
      this.fimServico = true;
      this.isenabled = false;
    } else if (this.servico.email !== this.email && this.servico.id_proposta){
      this.fimServico = false;
      this.isenabled = false;
    } else if (this.servico.email !== this.email && !this.servico.id_proposta){
      this.fimServico = false;
      this.isenabled = true;
    } else if (this.servico.email === this.email && !this.servico.id_proposta){
      this.fimServico = false;
      this.isenabled = false;
    }*/


    if (this.servico.email !== this.email) {
      //enable the button
      this.isenabled = true;
    } else {
      //disable the button
      this.isenabled = false;
    }

    if (this.servico.id_proposta) {
      //habilita finalizar servico apenas quando ja existe proposta
      this.isenabled = false;
      this.fimServico = true;
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


    //AQUI -> quando a tela ja esta aberta, o valor de finalizacao das partes nao carrega, logo, nao funciona a transacao. 

    console.log("email: " + this.email);
    console.log("servico: " + this.servico.email);

    if(this.email === this.servico.email){//se quem pediu o servico finaliza
      let addAlert = this.alertController.create({
        title: "Confirmação",
        message: "Tem certeza que deseja finalizar este servico?",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: "Aceitar",
            handler: () => {
              this.servicoProvider.requisitorFinaliza(servico, true);
  
              if (servico.oferecedorFinalizou) {
                console.log("scascascascascACSSCAASCascascasc");
                //TODO
                //enviar o saldo para o oferecedor de servico
                //tela de avaliacao de contraparte
              }
  
            }
          }]
      })

      addAlert.present();


    }else{
      let addAlert = this.alertController.create({
        title: "Confirmação",
        message: "Tem certeza que deseja finalizar este servico?",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: "Aceitar",
            handler: () => {
              this.servicoProvider.oferecedorFinaliza(servico, true);
  
              if (servico.requisitorFinalizou) {
                console.log("scascascascascACSSCAASCascascasc");
                //TODO
                //recebe o saldo do requisitor
                //tela de avaliacao de contraparte
              }
  
            }
          }]
      })

      addAlert.present();


    }

  }

}
