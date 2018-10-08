import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//importa a session
import { SessionProvider } from '../../providers/session/session';
//importa user de auth
import { User } from '../../providers/auth/user';

@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html'
})
export class MensagensPage {
  usuarioLogado: string;

  items:any[] = [
    {titulo: "teste1", texto: "texto1"},
    {titulo: "teste2", texto: "texto2"},
    {titulo: "teste3", texto: "texto3"},
    {titulo: "teste4", texto: "texto5"},
    {titulo: "teste5", texto: "texto6"}
  ]

  constructor(public navCtrl: NavController, public session: SessionProvider) { }

  criaSession() {
    /*this.session.get().then(res =>{
      this.usuarioLogado = res.toString();
      console.log(this.usuarioLogado);
    });*/
    /*this.session.get()
        .then(res => {
          this.usuarioLogado = new User(res);
          console.log('usuário logado  >>> ',this.usuarioLogado);
      });*/
    this.session.resgataEmail();
    console.log(this.session.resgataEmail());
    //console.log(this.session.resgataEmail());
  }

}
