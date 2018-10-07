import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthProvider } from '../../providers/auth/auth';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(private session: SessionProvider, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarPage');
  }

  registrar(){
    if(this.form.form.valid){
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
      this.authProvider.createUser(this.user)
      .then((user:any) =>{
        //salva o usuario na sessao
        this.session.create(this.user);

        toast.setMessage('Usuario cadastrado com sucesso');
        toast.present();
        
        this.navCtrl.setRoot(LoginPage);//Mudar para AtualizaperfilPage / chamar o signin do auth
      })
      .catch((error: any)=>{
        if (error.code  == 'auth/email-already-in-use') {
          toast.setMessage('O e-mail digitado já está em uso.');
        } else if (error.code  == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code  == 'auth/operation-not-allowed') {
          toast.setMessage('Não está habilitado criar usuários.');
        } else if (error.code  == 'auth/weak-password') {
          toast.setMessage('A senha digitada é muito fraca.');
        }
        toast.present();
      });
    }

  }

  cancel(){
    this.navCtrl.pop();
  }

}
