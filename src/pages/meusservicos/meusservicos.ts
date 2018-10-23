import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastraservicoPage } from '../cadastraservico/cadastraservico';
import { Observable } from 'rxjs';
import { ServicoProvider } from '../../providers/servico/servico';
import { SessionProvider } from '../../providers/session/session';
import { ServicoSingularPage } from '../servico-singular/servico-singular';
import { MinhaspropostasPage } from '../minhaspropostas/minhaspropostas';


@Component({
  selector: 'page-meusservicos',
  templateUrl: 'meusservicos.html'
})
export class MeusservicostPage {
  meusServicos: Observable<any>;
  email:any = this.session.resgataEmail()

  constructor(public navCtrl: NavController, private provider: ServicoProvider, private session: SessionProvider) {
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

}
