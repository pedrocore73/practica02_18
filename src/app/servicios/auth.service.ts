import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlUsuario = environment.urlUsuario;

  constructor(private http: HttpClient) { }

  postUsuario(usuario) {
    return this.http.post(this.urlUsuario, usuario)
                      .pipe(
                        map((res:any)=>{
                          return res;
                        })
                      )
  }

}
