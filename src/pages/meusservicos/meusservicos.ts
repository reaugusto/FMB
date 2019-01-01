import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CadastraservicoPage } from '../cadastraservico/cadastraservico';
import { Observable } from 'rxjs';
import { ServicoProvider } from '../../providers/servico/servico';
import { SessionProvider } from '../../providers/session/session';
import { ServicoSingularPage } from '../servico-singular/servico-singular';
import { PropostasMeuServicoPage } from '../propostas-meu-servico/propostas-meu-servico';
import { PropostaProvider } from '../../providers/proposta/proposta';


@Component({
  selector: 'page-meusservicos',
  templateUrl: 'meusservicos.html'
})
export class MeusservicostPage {
  meusServicos: Observable<any>;
  servicosAtivos: Observable<any>;
  email:any = this.session.resgataEmail()
  mservicos: any;

  constructor(public navCtrl: NavController, private servicoProvider: ServicoProvider, private session: SessionProvider,
    private alertController: AlertController, private propostaProvider: PropostaProvider) {
      this.meusServicos = this.servicoProvider.getMeusServicos(this.email);
      this.servicosAtivos = this.servicoProvider.getServicosAtivos(this.email);
      this.mservicos = "ativos";
  }

  cadastraServico(){
    this.navCtrl.push(CadastraservicoPage);
  }

  mostraServicoSingular(servico:any){
    console.log(servico);//objeto inteiro
    //passar o objeto servico para a proxima pagina
    this.navCtrl.push(CadastraservicoPage, {servico});
    
  }

  PropostasEFinalizar(servico: any){
    if(servico.id_proposta){
      this.navCtrl.push(ServicoSingularPage, {servico});
    } else {
    this.navCtrl.push(PropostasMeuServicoPage , {servico});
    }
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
              this.propostaProvider.removePropostasDoServico(servico.key);
              this.servicoProvider.remove(servico.key);
          }
        }]
    })
    addAlert.present();
  }

  //ATIVOS
  testeAtivos(servico: any){
    this.navCtrl.push(ServicoSingularPage, {servico});
  }

}
