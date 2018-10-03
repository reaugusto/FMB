import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';//se der errado colocar um './' no inicio do caminho
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@IonicPage()
@Component({
  selector: 'page-cadastraservico',
  templateUrl: 'cadastraservico.html',
})
export class CadastraservicoPage {
  title: string;
  form: FormGroup;
  servico: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ServicoProvider,
    private toast: ToastController) {

    this.servico = this.navParams.data.servico || {};
    this.createForm();
    this.setupPageTitle();
  }

  cancel(){
    this.navCtrl.pop();
  }

  private setupPageTitle(){
    this.title = this.navParams.data.servico ? 'Alterar serviço' : 'Novo serviço';
  }
  
  createForm(){
    this.form = this.formBuilder.group({
      key: [this.servico.key],
      id_servico: [this.servico.id_servico],//recebe uma key
      categoria: [this.servico.categoria],
      detalhes: [this.servico.detalhes],
      orcamento: [this.servico.orcamento],
      tipo: [this.servico.tipo],
      titulo: [this.servico.titulo],
      cpf: [this.servico.cpf],//recebe o cpf do usuario
      id_proposta: [this.servico.id_proposta],//tirar isso daqui (deixar apenas para evitar erros por enquanto)
    })
  }

  onSubmit(){
    if(this.form.valid){
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

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad CadastraservicoPage');
  }*/

}
