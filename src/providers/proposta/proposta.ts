import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the PropostaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PropostaProvider {
  private PATH = 'propostas/';

  constructor(private db: AngularFireDatabase){ }

  //usar para mostrar ao usuário todas suas propostas
  getAll(){ //faz uma lista de todos os objetos salvos no firebase no caminho 'PATH'
    return this.db.list(this.PATH) //, ref => ref.orderByChild("email").equalTo(user.email)
      .snapshotChanges()
      .map(changes => {
      return changes.map(s => ({
        key: s.key,...s.payload.val()
      }));
    })
  }

  getMinhasPropostas(email){
    return this.db.list(this.PATH, ref => ref.orderByChild("email").equalTo(email))
      .snapshotChanges()
      .map(changes => {
      return changes.map(s => ({
        key: s.key,...s.payload.val()
      }));
    })
  }

  getPropostasServicos(id_servico:any){
    return this.db.list(this.PATH, ref => ref.orderByChild("id_servico").equalTo(id_servico))
      .snapshotChanges()
      .map(changes => {
      return changes.map(s => ({
        key: s.key,...s.payload.val()
      }));
    })
  }

  //usar para popular id_proposta dentro do servico que o aceitar CASO NECESSARIO
 get(key: string){ // retorna um unico objeto referenciado por 'key' do caminho 'PATH' no firebase
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(s=>{
      return { key: s.key,...s.payload.val() }
    })
  }

  save(proposta: any){//quando ja existente atualiza, quando nao existente cria.
    return new Promise((resolve, reject) => {
      if (proposta.key){
        this.db.list(this.PATH)
        .update(proposta.key, { //id_proposta será a key gerada
          tempo_entrega: proposta.tempo_entrega,
          valor: parseFloat(proposta.valor),
          id_servico: proposta.id_servico,
          cpf: proposta.cpf,
          email: proposta.email
        })
        .then(() => resolve())
        .catch((e) => reject(e));
      }else{
        this.db.list(this.PATH)
        .push({ //id_proposta será a key gerada
          tempo_entrega: proposta.tempo_entrega,
          valor: parseFloat(proposta.valor),
          id_servico: proposta.id_servico,
          cpf: proposta.cpf,
          email: proposta.email
        })
        .then(() => resolve());
      }

    });
  }

  remove(key: any){//apaga do banco
    return this.db.list(this.PATH).remove(key);
  }

  //rever essa funcao
  removePropostasDoServico(id_servico){
    let propostas = this.getPropostasServicos(id_servico);
    
      propostas.forEach(val => {
        for (let i=0; i<val.length ;i++){
        this.remove(val[i].key);
        }
      });
  }

  removeUponAccept(proposta: any , servico: any){
    let todasPropostas = this.getPropostasServicos(servico.key);
    
      todasPropostas.forEach(val => {
        for (let i=0; i<val.length ;i++){
          if(val[i].key !== proposta){
            this.remove(val[i].key);
          }
        }
      });
  }
}
