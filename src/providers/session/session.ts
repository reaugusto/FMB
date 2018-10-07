import { Storage } from "@ionic/storage";
//import { UsuarioProvider } from '../usuario/usuario';
import { User } from '../auth/user'
import { Injectable } from '@angular/core';

@Injectable()
export class SessionProvider {

  constructor(public storage: Storage) { }

  create(usuario: User) {
    //salvar apenas email por questoes de seguranca
    this.storage.set('usuario', usuario.email);
  }

  get(): Promise<any> {
    return this.storage.get('usuario');
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
