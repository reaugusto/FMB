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

  categoriaServ: string;
  public subcategoriaServ: string;
  sub: any[];

  alimentos: string[] = [
    "Todos",
    "bolos",
    "pães",
    "salgados",
    "torta",
    "doces",
    "lanches",
    "trufas",
  ];
  profissionais: string[] = [
    "Todos",
    "Bartender",
    "DJ",
    "Segurança",
    "Garçom",
    "Cerimonialista",
    "Cozinheiro",
    "Limpeza",
    "Pedreiro",
    "Pintor",
    "Fotógrafo",
    "Montador de imóveis",
    "Capinador",
    "Marceneiro",
    "Entregador",
    "Jardineiro",
  ];

  saudeebeleza: string[] = [
    "Todos",
    "Depilação",
    "Manicure e Pedicure",
    "Maquiadora",
    "Cabeleireiro",
    "Massagem",
    "Sobrancelha",
    "Queratinização"
  ];

  arteemanufatura: string[] = [
    "Todos",
    "Bordadeira",
    "Pintor",
    "brinde e personalização",
    "Costureira",
    "Passadeira",
    "Lavadeira",
    "Carpinteiro",
    "Decoração",
    "Floricultura",
    "Grafiteiro"
  ]

  constructor(public navCtrl: NavController, private provider: ServicoProvider,
    private toast: ToastController, public navParams: NavParams) {
      this.categoriaServ = this.navParams.get("categoriaServ");
      console.log(this.categoriaServ);

      this.servicos = this.provider.getAll(this.categoriaServ);
      
      if (this.categoriaServ == "Alimentos") {
        this.sub = this.alimentos;
      } else if (this.categoriaServ == "Profissionais") {
        this.sub = this.profissionais;
      } else if (this.categoriaServ == "Saudeebeleza") {
        this.sub = this.saudeebeleza;
      } else if (this.categoriaServ == "Arteemanufatura") {
        this.sub = this.arteemanufatura;
      }
  }

  
  alteraSub(){
    console.log(this.subcategoriaServ);
    if(this.subcategoriaServ == "Todos"){
      this.servicos = this.provider.getAll(this.categoriaServ);
    }else{
    this.servicos = this.provider.getAllSub(this.subcategoriaServ);
    }
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarservicosPage');
  }*/

}
