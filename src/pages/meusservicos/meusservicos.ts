import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastraservicoPage } from '../cadastraservico/cadastraservico';


@Component({
  selector: 'page-meusservicos',
  templateUrl: 'meusservicos.html'
})
export class MeusservicostPage {

  constructor(public navCtrl: NavController) {

  }

  cadastraServico(){
    this.navCtrl.push(CadastraservicoPage);
  }

}
