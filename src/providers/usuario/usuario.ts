import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioProvider {
  private PATH = 'usuarios/';

  constructor(private db: AngularFireDatabase){ }

  //mudar nome dessa funcao para getUsuario
  getLogado(email){
    return this.db.list(this.PATH, ref => ref.orderByChild("email").equalTo(email).limitToFirst(1))
      .snapshotChanges()
      .map(changes => {
      return changes.map(s => ({
        key: s.key,...s.payload.val()
      }));
    })
  }
  
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
          saldo: usuario.saldo // ver se realmente sera necessaria essa linha de codigo
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
          saldo: 0
        })
        .then(() => resolve());
      }

    });
  }

  adicionarSaldo(saldoAdicionado, usuario){
    let saldoFinal = usuario.saldo + saldoAdicionado;
    saldoFinal = Math.round(saldoFinal*100) / 100;
    
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH)
        .update(usuario.key, {
          saldo: saldoFinal
        })
        .then(() => resolve())
        .catch((e) => reject(e));
  });
  }
  
  //atualiza saldo do pagante
  efetuarPagamento(usuario, servico){
    console.log(servico.emailPropositor)
    let saldoFinal = usuario.saldo - servico.valorFinal;
    saldoFinal = Math.round(saldoFinal*100) / 100;

    new Promise((resolve, reject) => {
      this.db.list(this.PATH)
        .update(usuario.key, {
          saldo: saldoFinal
        })
        .then(() => resolve())
        .catch((e) => reject(e));
  });

  //atualiza saldo do recebedor
    let recebedor = this.getLogado(servico.emailPropositor).subscribe(res =>{
      let usuarioRecebedor:any;
      usuarioRecebedor = res[0];
      let saldoFinalRecebedor = usuarioRecebedor.saldo + servico.valorFinal;
      saldoFinalRecebedor = Math.round(saldoFinalRecebedor*100) / 100;
      
      new Promise((resolve, reject) => {
        this.db.list(this.PATH)
          .update(usuarioRecebedor.key, {
            saldo: saldoFinalRecebedor
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      });

      recebedor.unsubscribe();
    })
    
  }

  remove(key: string){//apaga do banco
    return this.db.list(this.PATH).remove(key);
  }

}
