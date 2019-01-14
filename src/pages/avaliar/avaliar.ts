import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the AvaliarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliar',
  templateUrl: 'avaliar.html',
})
export class AvaliarPage {

  avaliacao: number = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliarPage');
  }

  log(valor){
    this.avaliacao = valor;
  }

  uploadVal(){
    console.log(this.avaliacao);
    
  }

}
