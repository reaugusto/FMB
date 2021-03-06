import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { TabsPage } from '../tabs/tabs';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../providers/auth/user';

//importa a session
import { SessionProvider } from '../../providers/session/session';
import { AtualizaperfilPage } from '../atualizaperfil/atualizaperfil';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Observable } from 'rxjs';
import { PasswordresetPage } from '../passwordreset/passwordreset';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User = new User();
  userLog: Observable<any>;
  @ViewChild('form') form: NgForm;

  constructor(private session: SessionProvider, public navCtrl: NavController, public navParams: NavParams,
    private authProvider: AuthProvider, private toastCtrl: ToastController,
    private usuarioLogado: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  cadastrar(){
    this.navCtrl.push(CadastrarPage);
  }

  passwordReset(){
    this.navCtrl.push(PasswordresetPage);
  }

  signIn(){

    //validar o formulario antes de entrar diretamente e o que causa o bug de passar pela tela inicial primeiramente
    if(this.form.form.valid){
      this.session.create(this.user);
      this.session.get();
      this.authProvider.signIn(this.user)
      .then(() => {
        this.userLog = this.usuarioLogado.getLogado(this.user.email);
        this.navCtrl.setRoot(TabsPage);
        const y = this.userLog.subscribe(res => {
          if(!res[0]){
            this.navCtrl.push(AtualizaperfilPage);
          }
          y.unsubscribe();
        });
      })
      .catch((error:any) => {
        let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado n??o ?? valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usu??rio est?? desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usu??rio n??o foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada n??o ?? valida.');
          }
          toast.present();
      })
    }
    
  }
}
