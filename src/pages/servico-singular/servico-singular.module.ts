import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicoSingularPage } from './servico-singular';

@NgModule({
  declarations: [
    ServicoSingularPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicoSingularPage),
  ],
})
export class ServicoSingularPageModule {}
