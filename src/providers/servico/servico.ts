import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { PropostaProvider } from '../proposta/proposta';

@Injectable()
export class ServicoProvider {
  private PATH = 'servicos/';

  constructor(private db: AngularFireDatabase) { }

  getAll(categoriaServ) { //faz uma lista de todos os objetos salvos no firebase no caminho 'PATH'
    return this.db.list(this.PATH, ref => ref.orderByChild("categoria").equalTo(categoriaServ))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  getServicoFim(key){
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(s => {
          return { key: s.key, ...s.payload.val() }
        });
  }

  getAllSub(subcategoriaServ) { //faz uma lista de todos os objetos salvos no firebase no caminho 'PATH'
    return this.db.list(this.PATH, ref => ref.orderByChild("tipo").equalTo(subcategoriaServ))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  getMeusServicos(email){
    return this.db.list(this.PATH, ref => ref.orderByChild("email").equalTo(email))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  getServicosAtivos(email){
    console.log(email);
    return this.db.list(this.PATH, ref => ref.orderByChild("emailPropositor").equalTo(email))
      .snapshotChanges()
      .map(changes => {
        return changes.map(s => ({
          key: s.key, ...s.payload.val()
        }));
      })
  }

  /*get(key: string) { // retorna um unico objeto referenciado por 'key' do caminho 'PATH' no firebase
  //console.log(this.PATH + key); //esta funcionando perfeitamente
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(s => {
        return { key: s.key, ...s.payload.val() }
      })
  }*/

  save(servico: any) {//quando ja existente atualiza, quando nao existente cria.
    return new Promise((resolve, reject) => {
      if (servico.key) {
        this.db.list(this.PATH)
          .update(servico.key, {
            id_servico: servico.id_servico,
            categoria: servico.categoria,
            detalhes: servico.detalhes,
            orcamento: parseFloat(servico.orcamento),
            tipo: servico.tipo,
            titulo: servico.titulo,
            email: servico.email,
            id_proposta: servico.id_proposta
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            id_servico: servico.id_servico,
            categoria: servico.categoria,
            detalhes: servico.detalhes,
            orcamento: parseFloat(servico.orcamento),
            tipo: servico.tipo,
            titulo: servico.titulo,
            email: servico.email,
            id_proposta: servico.id_proposta
          })
          .then(() => resolve());
      }

    });
  }

  aceitaProposta(servico:any, proposta:any){
    return new Promise((resolve, reject) => {
        this.db.list(this.PATH)
          .update(servico.key, {
            id_proposta: proposta.key,
            emailPropositor: proposta.email,
            valorFinal: proposta.valor
          })
          .then(() => resolve())
          .catch((e) => reject(e));
    });
  }





  requisitorFinaliza(servico:any){
    return new Promise((resolve, reject) => {
        this.db.list(this.PATH)
          .update(servico.key, {
            requisitorFinalizou: true
          })
          .then(() => resolve())
          .catch((e) => reject(e));
    });
  }

  oferecedorFinaliza(servico:any){
    return new Promise((resolve, reject) => {
        this.db.list(this.PATH)
          .update(servico.key, {
            oferecedorFinalizou: true
          })
          .then(() => resolve())
          .catch((e) => reject(e));
    });
  }





  remove(key: string) {//apaga do banco
    return this.db.list(this.PATH).remove(key);
  }

}
