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
import { MostrarservicosPage } from '../pages/mostrarservicos/mostrarservicos';
import { ServicoSingularPage } from '../pages/servico-singular/servico-singular';
import { FazerpropostaPage } from '../pages/fazerproposta/fazerproposta'
import { PropostasMeuServicoPage } from '../pages/propostas-meu-servico/propostas-meu-servico'
import { RoomPage } from '../pages/room/room'
import { AvaliarPage } from '../pages/avaliar/avaliar'
import { IonRatingComponent } from '../components/ion-rating/ion-rating'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicoProvider } from '../providers/servico/servico';
import { AuthProvider } from '../providers/auth/auth';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { PropostaProvider } from '../providers/proposta/proposta';
import { IonicStorageModule } from '@ionic/storage';
import { SessionProvider } from '../providers/session/session';
import { AtualizaperfilPage } from '../pages/atualizaperfil/atualizaperfil';
import { from } from 'rxjs';
import { MsgsProvider } from '../providers/msgs/msgs';

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
    CadastraservicoPage,
    MostrarservicosPage,
    AtualizaperfilPage,
    ServicoSingularPage,
    FazerpropostaPage,
    PropostasMeuServicoPage,
    RoomPage,
    AvaliarPage,
    IonRatingComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCtvA9x1M-qamTHfBJzpJDo8JoG8n1b1SA",
      authDomain: "facilmbarato.firebaseapp.com",
      databaseURL: "https://facilmbarato.firebaseio.com",
      projectId: "facilmbarato",
      storageBucket: "facilmbarato.appspot.com",
      messagingSenderId: "893120931333"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
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
    CadastraservicoPage,
    MostrarservicosPage,
    AtualizaperfilPage,
    ServicoSingularPage,
    FazerpropostaPage,
    PropostasMeuServicoPage,
    RoomPage,
    AvaliarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServicoProvider,
    AuthProvider,
    UsuarioProvider,
    PropostaProvider,
    SessionProvider,
    MsgsProvider
  ]
})
export class AppModule { }
