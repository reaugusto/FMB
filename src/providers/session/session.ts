import { Storage } from "@ionic/storage";
//import { UsuarioProvider } from '../usuario/usuario';
import { User } from '../auth/user'
import { Injectable } from '@angular/core';

@Injectable()
export class SessionProvider {
  public teste:string;
  constructor(private storage: Storage) { }

  create(usuario: User) {
    //salvar apenas email por questoes de seguranca
    this.storage.set('email', usuario.email);
    console.log(usuario.email);
  }

  get(): Promise<any> {
    return this.storage.get('email');
  }

  resgataEmail(): string {
    console.log('1')
    this.get().then(async (val:string) => {
      this.teste = await val;
      await console.log('2');
      await console.log("DENTRO >>", this.teste);
    });
    console.log('3');
    console.log("FORA >>", this.teste);
    return this.teste;
  }

  remove() {
    this.storage.remove('usuario');
  }

  exist() {
    this.get().then(res => {
      console.log('resultado: ', res);
      if (res) {
        console.log('resultado if');
        return true;
      } else {
        console.log('resultado else');
        return false;
      }
    });
}


}
