import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlUsuario = environment.urlUsuario;
  urlLogin = environment.urlLogin;
  token: any;
  private imagenIn = new BehaviorSubject<any>({imagen: ''});

  get isImagenIn() {
    return this.imagenIn.asObservable();
  }

  setImagen(imagen) {
    this.imagenIn.next({imagen: imagen})
  }

  constructor(private http: HttpClient) { }

  getUsuario() {
    return this.http.get(this.urlUsuario + '?token=' + this.token)
                      .pipe(
                        map((res:any)=>{
                          return res;
                        })
                      )
  }

  postUsuario(usuario) {
    return this.http.post(this.urlUsuario, usuario)
                      .pipe(
                        map((res:any)=>{
                          return res;
                        })
                      )
  }

  login(credenciales) {
    return this.http.post(this.urlLogin, credenciales)
                      .pipe(
                        map((res:any)=>{
                          this.setImagen(res.imagen);
                          this.token = res.token;
                          return res;
                        })
                      )
  }



}
