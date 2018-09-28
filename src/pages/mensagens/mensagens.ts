import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html'
})
export class MensagensPage {

  items:any[] = [
    {titulo: "teste1", texto: "texto1"},
    {titulo: "teste2", texto: "texto2"},
    {titulo: "teste3", texto: "texto3"},
    {titulo: "teste4", texto: "texto5"},
    {titulo: "teste5", texto: "texto6"}
  ]

  constructor(public navCtrl: NavController) {
     
        
}
}
