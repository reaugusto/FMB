import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PropostaProvider } from '../../providers/proposta/proposta';
import { Observable } from 'rxjs';
import { ServicoProvider } from '../../providers/servico/servico';

/**
 * Generated class for the PropostasMeuServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-propostas-meu-servico',
  templateUrl: 'propostas-meu-servico.html',
})
export class PropostasMeuServicoPage {
  servico: any;
  propostas: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: PropostaProvider,
    private alertController: AlertController, private servicoProvider: ServicoProvider) {
    this.servico = this.navParams.get('servico');
    this.propostas = this.provider.getPropostasServicos(this.servico.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropostasMeuServicoPage');
  }

  aceitaProposta(proposta:any) {
    //TODO
    //mostra alert de confirmacao
    let addAlert = this.alertController.create({
      title: "Confirmação",
      message: "Tem certeza que deseja aceitar esta proposta para seu servico?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: "Aceitar",
          handler: ()=>{
              this.servicoProvider.aceitaProposta(this.servico, proposta.key, proposta.email);
              this.navCtrl.pop();
          }
        }]
    })
    addAlert.present();
  }
}
