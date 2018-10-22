import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ServicoProvider } from '../../providers/servico/servico';
import { FazerpropostaPage } from '../fazerproposta/fazerproposta';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ServicoProvider) {
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

}
