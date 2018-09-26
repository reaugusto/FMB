import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';

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

}
