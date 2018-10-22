import { Component } from '@angular/core';

import { ServicosPage } from '../servicos/servicos';
import { MeusservicostPage } from '../meusservicos/meusservicos';
import { MensagensPage } from '../mensagens/mensagens';
import { PerfilPage } from '../perfil/perfil';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MensagensPage;
  tab2Root = ServicosPage;
  tab3Root = MeusservicostPage;
  tab4Root = PerfilPage;

  constructor(public session: SessionProvider) {
    //this.session.resgataEmail();
    //console.log(this.session.resgataEmail());
  }
}
