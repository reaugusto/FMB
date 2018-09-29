import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ServicosPage } from '../pages/servicos/servicos';
import { MeusservicostPage } from '../pages/meusservicos/meusservicos';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { PerfilPage } from '../pages/perfil/perfil';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { CadastraservicoPage } from '../pages/cadastraservico/cadastraservico';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ServicosPage,
    MeusservicostPage,
    MensagensPage,
    PerfilPage,
    TabsPage,
    LoginPage,
    CadastrarPage,
    CadastraservicoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServicosPage,
    MeusservicostPage,
    MensagensPage,
    PerfilPage,
    TabsPage,
    LoginPage,
    CadastrarPage,
    CadastraservicoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
