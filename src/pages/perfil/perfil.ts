import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  constructor(public navCtrl: NavController, private authProvider: AuthProvider) {

  }

  signOut(){
    this.authProvider.singOut()
    .then(()=>{
      this.navCtrl.setRoot(LoginPage);
      window.location.reload(true);
    })
    .catch((error) => {
      console.error(error);
    });
  }

}
