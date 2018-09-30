import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastraservicoPage } from '../cadastraservico/cadastraservico';
import { MostrarservicosPage } from '../mostrarservicos/mostrarservicos';

@Component({
  selector: 'page-servicos',
  templateUrl: 'servicos.html'
})
export class ServicosPage {

  constructor(public navCtrl: NavController) {

  }

  abrepagina(){
    this.navCtrl.push(MostrarservicosPage);
  }

  cadastraServico(){
    this.navCtrl.push(CadastraservicoPage);
  }
}
