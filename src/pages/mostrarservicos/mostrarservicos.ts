import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';//se der errado colocar um './' no inicio do caminho
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MostrarservicosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrarservicos',
  templateUrl: 'mostrarservicos.html',
})
export class MostrarservicosPage {
  servicos: Observable<any>;

  categoriaServ:any;
  public subcategoriaServ:String;

  constructor(public navCtrl: NavController, private provider: ServicoProvider,
    private toast: ToastController, public navParams: NavParams) {
      this.categoriaServ = this.navParams.get("categoriaServ");
      console.log(this.categoriaServ);

      this.servicos = this.provider.getAll(this.categoriaServ);
      
  }

  
  alteraSub(subcategoriaServ: String){
    if(subcategoriaServ == "Todos"){
      this.servicos = this.provider.getAll(this.categoriaServ);
    }else{
    this.servicos = this.provider.getAllSub(subcategoriaServ);
    }
  }


  /*ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarservicosPage');
  }*/

}
