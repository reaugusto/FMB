import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioProvider {
  private PATH = 'usuarios/';

  constructor(private db: AngularFireDatabase){ }

  /*getAll(){ //faz uma lista de todos os objetos salvos no firebase no caminho 'PATH'
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
      return changes.map(s => ({
        key: s.key,...s.payload.val()
      }));
    })
  }*/
  
  get(key: string){ // retorna um unico objeto referenciado por 'key' do caminho 'PATH' no firebase
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(s=>{
      return { key: s.key,...s.payload.val() }
    })
  }


  save(usuario: any){//quando ja existente atualiza, quando nao existente cria.
    return new Promise((resolve, reject) => {
      if (usuario.key){
        this.db.list(this.PATH)
        .update(usuario.key, {//email sera a key | preciso resgatar email do auth na sessao para fazer o update com ele na key
          cpf: usuario.cpf,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          avaliacao: usuario.avaliacao,
          cep: usuario.cep,
          numero: usuario.numero,
          email: usuario.email,
          telefone: usuario.telefone,
          saldo: usuario.saldo
        })
        .then(() => resolve())
        .catch((e) => reject(e));
      }else{
        this.db.list(this.PATH)
        .push({
          cpf: usuario.cpf,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          avaliacao: usuario.avaliacao,
          cep: usuario.cep,
          numero: usuario.numero,
          email: usuario.email,
          telefone: usuario.telefone,
          saldo: usuario.saldo
        })
        .then((result: any) => resolve(result.key))
      }

    });
  }

  remove(key: string){//apaga do banco
    return this.db.list(this.PATH).remove(key);
  }

}
