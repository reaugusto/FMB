import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: AuthProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

  reset(){
    let alert = this.alertCtrl.create({
      buttons: [
        {
          text:"Ok",
          handler: () =>{
            this.navCtrl.pop();
          }  
        }
      ]
    })
    this.userService.passwordreset(this.email).then((res: any) => {
      if (res.success){
        alert.setTitle('E-mail enviado');
        alert.setSubTitle('Por favor, siga as instruções enviadas ao seu e-mail para redefinir sua senha')
      } else {
        alert.setTitle('Falha');
      }
    })
    alert.present();
  }

  goback(){
    this.navCtrl.setRoot(LoginPage);
  }

}
