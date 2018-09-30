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

  /*abrepagina(){
    this.navCtrl.push(LoginPage);
  }*/

  private setupPageTitle(){
    this.title = this.navParams.data.servico ? 'Alterando contato' : 'Novo contato';
  }
  
  createForm(){
    this.form = this.formBuilder.group({
      key: [this.servico.key],
      id_servico: [this.servico.id_servico, Validators.required],
      categoria: [this.servico.categoria, Validators.required],
      detalhes: [this.servico.detalhes, Validators.required],
      orcamento: [this.servico.orcamento, Validators.required],
      tipo: [this.servico.tipo, Validators.required],
      titulo: [this.servico.titulo, Validators.required],
      cpf: [this.servico.cpf, Validators.required],
      id_proposta: [this.servico.id_proposta],
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
