import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SessionProvider } from '../../providers/session/session';

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
  email: string;
  avaliacao: number = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioProvider: UsuarioProvider) {
      this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliarPage');
  }

  log(valor){
    this.avaliacao = valor;
  }

  uploadVal(){
    this.usuarioProvider.avaliar(this.avaliacao, this.email);
    this.navCtrl.pop();
  }

}
