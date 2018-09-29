import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CadastraservicoPage } from '../cadastraservico/cadastraservico';

@Component({
  selector: 'page-servicos',
  templateUrl: 'servicos.html'
})
export class ServicosPage {

  constructor(public navCtrl: NavController) {

  }

  abrepagina(){
    this.navCtrl.push(LoginPage);
  }

  cadastraservico(){
    this.navCtrl.push(CadastraservicoPage);
  }
}
