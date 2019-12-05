import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlUsuario = environment.urlUsuario;
  urlLogin = environment.urlLogin;
  token: any;

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
                          this.token = res.token;
                          return res;
                        })
                      )
  }



}
