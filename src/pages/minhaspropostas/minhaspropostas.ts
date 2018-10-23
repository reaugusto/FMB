import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { PropostaProvider } from '../../providers/proposta/proposta';
import { SessionProvider } from '../../providers/session/session';
import { FazerpropostaPage } from '../fazerproposta/fazerproposta';

/**
 * Generated class for the MinhaspropostasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minhaspropostas',
  templateUrl: 'minhaspropostas.html',
})
export class MinhaspropostasPage {
  minhasPropostas: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private provider: PropostaProvider, private session: SessionProvider) {
    this.minhasPropostas = this.provider.getMinhasPropostas(this.session.resgataEmail());
  }

  editaProposta(proposta){
    this.navCtrl.push(FazerpropostaPage, {proposta});
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad MinhaspropostasPage');
  }*/

}
