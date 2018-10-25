import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropostaProvider } from '../../providers/proposta/proposta';
import { Observable } from 'rxjs';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: PropostaProvider) {
    this.servico = this.navParams.get('servico');
    this.propostas = this.provider.getPropostasServicos(this.servico.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropostasMeuServicoPage');
  }

  aceitaProposta(){
    //TODO
    //manda o servico em questao (this.servico) receber o id da proposta (proposta.key) e envia para o firebase
  }

  recusaProposta(){
    //TODO
    //mostra alert e depois remove do firebase caso SIM
  }
}
