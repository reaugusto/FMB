import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionProvider } from '../../providers/session/session';
import { PropostaProvider } from '../../providers/proposta/proposta';

/**
 * Generated class for the FazerpropostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fazerproposta',
  templateUrl: 'fazerproposta.html',
})
export class FazerpropostaPage {
  servico: any;
  proposta: any;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private provider: PropostaProvider, private toast: ToastController,
    private session: SessionProvider) {

    this.proposta = this.navParams.data.proposta || {};
    this.servico = this.navParams.get('servico');

    this.createForm();
    console.log(this.servico);
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.proposta.key],
      tempo_entrega: [this.proposta.tempo_entrega],
      valor: [this.proposta.valor],
      id_servico: [this.servico.key],// fala que tem erro aqui mas funciona
      cpf: [this.proposta.cpf],
      email: [this.session.resgataEmail()]

      //detalhes: [this.proposta.detalhes],// analisar
      //email: [this.session.resgataEmail()],//recebe o email do usuario, analisar
      //id_proposta: [this.proposta.id_proposta],//tirar isso daqui (deixar apenas para evitar erros por enquanto)
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Proposta criada com sucesso', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao tentar criar proposta', duration: 3000 }).present();
          console.error(e);
        });
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FazerpropostaPage');
  }

}
