import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CadastraservicoPage } from '../cadastraservico/cadastraservico';
import { Observable } from 'rxjs';
import { ServicoProvider } from '../../providers/servico/servico';
import { SessionProvider } from '../../providers/session/session';
import { ServicoSingularPage } from '../servico-singular/servico-singular';
import { MinhaspropostasPage } from '../minhaspropostas/minhaspropostas';
import { PropostasMeuServicoPage } from '../propostas-meu-servico/propostas-meu-servico';


@Component({
  selector: 'page-meusservicos',
  templateUrl: 'meusservicos.html'
})
export class MeusservicostPage {
  meusServicos: Observable<any>;
  email:any = this.session.resgataEmail()

  constructor(public navCtrl: NavController, private provider: ServicoProvider, private session: SessionProvider,
    private alertController: AlertController) {
      this.meusServicos = this.provider.getMeusServicos(this.email);
  }

  cadastraServico(){
    this.navCtrl.push(CadastraservicoPage);
  }

  mostraServicoSingular(servico:any){
    console.log(servico);//objeto inteiro
    //passar o objeto servico para a proxima pagina
    this.navCtrl.push(CadastraservicoPage, {servico});
    
  }

  mostraPropostas(){
    this.navCtrl.push(MinhaspropostasPage);
  }

  servicoPropostas(servico: any){
    this.navCtrl.push(PropostasMeuServicoPage , {servico});
  }

  removeServico(servico: any){
    let addAlert = this.alertController.create({
      title: "Confirmação",
      message: "Tem certeza que deseja remover este servico?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: "Aceitar",
          handler: ()=>{
              this.provider.remove(servico.key);
          }
        }]
    })
    addAlert.present();
  }

}
