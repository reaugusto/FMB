import { MsgsProvider } from './../../providers/msgs/msgs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';
import { FazerpropostaPage } from '../fazerproposta/fazerproposta';
import * as firebase from 'Firebase';
import { SessionProvider } from '../../providers/session/session';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AvaliarPage } from '../avaliar/avaliar';
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
    private session: SessionProvider, private alertController: AlertController, private usuarioProvider: UsuarioProvider) {
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

    if (this.servico.email === this.email){
      let finalizarRequisicao = this.servicoProvider.getServicoFim(this.servico.key).subscribe(res => {
        let servicoRequisitado: any;
        servicoRequisitado = res;
        if(servicoRequisitado.requisitorFinalizou){
          this.fimServico = false;
        }
        finalizarRequisicao.unsubscribe();
      });
    } else {
      let finalizarRequisicao = this.servicoProvider.getServicoFim(this.servico.key).subscribe(res => {
        let servicoRequisitado: any;
        servicoRequisitado = res;
        if(servicoRequisitado.oferecedorFinalizou){
          this.fimServico = false;
        }
        finalizarRequisicao.unsubscribe();
      });
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

    if(this.email === this.servico.email){//se quem pediu o servico finaliza
      let AlertPedindo = this.alertController.create({
        title: "Pedindo",
        message: "Tem certeza que deseja finalizar este servico?",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: "Aceitar",
            handler: () => {
              
              let finalizarRequisicao = this.servicoProvider.getServicoFim(servico.key).subscribe(res => {
                let servicoRequisitado: any;
                servicoRequisitado = res;
                
                this.servicoProvider.requisitorFinaliza(servico);

                if(servicoRequisitado.oferecedorFinalizou){//se ja esta pronto para entregar o servico
                  console.log("O oferecedor ja finalizou");
                  //enviar o saldo para o oferecedor de servico

                  
                  let usuario = this.usuarioProvider.getLogado(servicoRequisitado.email).subscribe(val => {
                    let usuarioPaga: any;
                    usuarioPaga = val[0];

                    if(usuarioPaga.saldo >= servicoRequisitado.valorFinal){
                      console.log("Efetua pagamento")
                      this.usuarioProvider.efetuarPagamento(usuarioPaga, servicoRequisitado);
                      //mover servico para servicos finalizados
                      this.servicoProvider.move(servicoRequisitado);
                      
                      
                    } else {
                      console.log("Abrir API para pagamento")
                    }

                    usuario.unsubscribe();
                  });
                  
                  
                }
                  //tela de avaliacao de contraparte (oferecedor)
                  let email = servico.emailPropositor;
                  this.navCtrl.push(AvaliarPage, {email});

                finalizarRequisicao.unsubscribe();
              });
              this.navCtrl.pop();
            }
          }]
            })
      AlertPedindo.present();
    }else{
      let AlertOferecendo = this.alertController.create({
        title: "Oferecendo",
        message: "Tem certeza que deseja finalizar este servico?",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: "Aceitar",
            handler: () => {

              let finalizarOferecimento = this.servicoProvider.getServicoFim(servico.key).subscribe(res => {
                let servicoOferecido: any;
                servicoOferecido = res;
                
                this.servicoProvider.oferecedorFinaliza(servico);

                if(servicoOferecido.requisitorFinalizou){
                  console.log("O requisitor ja finalizou");
                  //enviar o saldo para o oferecedor de servico
                  let usuario = this.usuarioProvider.getLogado(servicoOferecido.email).subscribe(val => {
                    let usuarioPaga: any;
                    usuarioPaga = val[0];

                    if(usuarioPaga.saldo >= servicoOferecido.valorFinal){
                      console.log("Efetua pagamento")
                      this.usuarioProvider.efetuarPagamento(usuarioPaga, servicoOferecido);
                      //mover servico para servicos finalizados
                      this.servicoProvider.move(servicoOferecido);
                      
                      
                    } else {
                      console.log("Abrir API para pagamento")
                    }

                    usuario.unsubscribe();
                  });
                 }
                  //tela de avaliacao de contraparte (requisitor)
                  let email = servico.email; 
                  this.navCtrl.push(AvaliarPage, {email});

                finalizarOferecimento.unsubscribe();
              });
              
              this.navCtrl.pop();
            }
          }]
      })
      AlertOferecendo.present();
    }
    
  }

}
