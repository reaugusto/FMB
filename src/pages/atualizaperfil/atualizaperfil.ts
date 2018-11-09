import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-atualizaperfil',
  templateUrl: 'atualizaperfil.html',
})
export class AtualizaperfilPage {
  form: FormGroup;
  usuario: any;
  email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: UsuarioProvider,
    private toast:ToastController, private session: SessionProvider) {
      this.usuario = this.navParams.data.obj || {};
      this.email = this.navParams.data.email;
      this.createForm();

      //TODO
      //if(!this.navParams.data.obj){
        //desabilitar o botao de cancelar / voltar a pagina;
      //} else {
        //reabilitar o botao
      //}
  }

  //habilitar apenas se ja existir um usuario criado com aquele cpf
  //ou simplesmente desabilitar essa funcao e botao de vez
  cancel() {
    this.navCtrl.pop();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.usuario.key],
      cpf: [this.usuario.cpf],
      nome: [this.usuario.nome],
      sobrenome: [this.usuario.sobrenome],
      avaliacao: [this.usuario.avaliacao],//tirar isso daqui
      cep: [this.usuario.cep],
      numero: [this.usuario.numero],
      email: [this.email],
      telefone: [this.usuario.telefone],
      saldo: [this.usuario.saldo]//tirar isso daqui
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Servico criado com sucesso', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao tentar criar servico', duration: 3000 }).present();
          console.error(e);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtualizaperfilPage');
  }

}
