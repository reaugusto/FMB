import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastraservicoPage } from '../cadastraservico/cadastraservico';
import { MostrarservicosPage } from '../mostrarservicos/mostrarservicos';
import { AvaliarPage } from '../avaliar/avaliar';

@Component({
  selector: 'page-servicos',
  templateUrl: 'servicos.html'
})
export class ServicosPage {
  constructor(public navCtrl: NavController) {

  }

  abrepagina(categoriaServ: string){
    console.log(categoriaServ)
    this.navCtrl.push(MostrarservicosPage, {categoriaServ});
  }

  cadastraServico(){
    this.navCtrl.push(CadastraservicoPage);
  }

}
