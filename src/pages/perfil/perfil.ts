import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { SessionProvider } from '../../providers/session/session';
import { AtualizaperfilPage } from '../atualizaperfil/atualizaperfil';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  constructor(private session: SessionProvider, public navCtrl: NavController, private authProvider: AuthProvider,
    private usuario: UsuarioProvider) {
      
      /*this.x = this.usuario.getLogado(this.session.resgataEmail());
      for(let data of this.x) {
        console.log("cep aqui !>" + data.cep);
      }*/
  }

  atualizarPerfil(){
    let email = this.session.resgataEmail();
    const y = this.usuario.getLogado(email).subscribe(res =>{
      let obj = res[0];
      this.navCtrl.push(AtualizaperfilPage, {obj});
      y.unsubscribe;
  });

    //  for(let data of this.x) {
    //    console.log("cep aqui !>" + data.cep);
    //  }
    //this.navCtrl.push(AtualizaperfilPage);
  }

  signOut(){
    this.session.remove();
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
